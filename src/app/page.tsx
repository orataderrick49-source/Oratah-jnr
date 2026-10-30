// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue, push, set, update } from "firebase/database";

export default function Page(){
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");
  const [wt,setWt]=useState(0);
  const [tt,setTt]=useState(0);
  useEffect(()=>{
    const r=ref(db,"posts");
    return onValue(r,(snap)=>{
      const v=snap.val();
      if(!v){setPosts([]);setWt(0);setTt(0);return;}
      const list=Object.values(v).map((x,i)=>{return {id:Object.keys(v)[i],...x}}).sort((a,b)=>b.createdAt-a.createdAt);
      setPosts(list);
      let w=0,t=0;
      list.forEach((p)=>{w+=(p.poll?.wantam||0); t+=(p.poll?.tutam||0);});
      setWt(w); setTt(t);
    });
  },[]);
  async function createPost(){
    if(!text.trim())return;
    const nr=push(ref(db,"posts"));
    await set(nr,{name:"Oratah jnr",handle:"@oratahjnr",avatar:"https://i.pravatar.cc/150?u=oratah",text:text,createdAt:Date.now(),poll:{wantam:0,tutam:0,votes:{}}});
    setText("");
  }
  async function vote(p,t){
    const w=p.poll?.wantam||0; const t2=p.poll?.tutam||0; const vs={...(p.poll?.votes||{})};
    let nw=w, nt=t2;
    if(vs["me"]===t){ if(t==="wantam")nw--; else nt--; delete vs["me"]; }
    else { if(vs["me"]==="wantam")nw--; if(vs["me"]==="tutam")nt--; if(t==="wantam")nw++; else nt++; vs["me"]=t; }
    await update(ref(db,"posts/"+p.id+"/poll"),{wantam:nw,tutam:nt,votes:vs});
  }
  const total=wt+tt; const wp=total?Math.round(wt/total*100):50;
  return(
  <div style={{minHeight:"100vh",background:"#050505",color:"white",maxWidth:600,margin:"0 auto",fontFamily:"system-ui"}}>
    <div style={{padding:"12px 16px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",position:"sticky",top:0,background:"#050505",zIndex:10}}>
      <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:30,height:30,background:"white",color:"black",borderRadius:8,display:"grid",placeItems:"center",fontWeight:900}}>S</div><div><div style={{fontWeight:800}}>SAUTI POLL 🇰🇪</div><div style={{fontSize:10,color:"#666"}}>● LIVE {total} VOTES</div></div></div>
      <div style={{background:"#111",padding:"6px 12px",borderRadius:99,border:"1px solid #222",fontSize:12}}><b style={{color:"#ef4444"}}>W {wt}</b> vs <b style={{color:"#22c55e"}}>T {tt}</b></div>
    </div>

    <div style={{margin:16,background:"linear-gradient(180deg,#111,#080808)",border:"1px solid #222",borderRadius:24,padding:16}}>
      <div style={{display:"flex",gap:12}}>
        <div style={{flex:1,background:"#1a0f0f",borderRadius:18,padding:14,textAlign:"center",border:"1px solid #2a1818"}}><div style={{fontSize:26}}>🔥</div><div style={{fontWeight:900,marginTop:4}}>WANTAM</div><div style={{fontSize:26,fontWeight:900,color:"#ef4444"}}>{wt}</div><div style={{fontSize:10,color:"#666"}}>RUTO MUST GO</div><div style={{height:6,background:"#2a1818",borderRadius:99,marginTop:8}}><div style={{height:6,width:wp+"%",background:"#ef4444",borderRadius:99}}></div></div></div>
        <div style={{flex:1,background:"#0f1a12",borderRadius:18,padding:14,textAlign:"center",border:"1px solid #182a1e"}}><div style={{fontSize:26}}>💚</div><div style={{fontWeight:900,marginTop:4}}>TUTAM</div><div style={{fontSize:26,fontWeight:900,color:"#22c55e"}}>{tt}</div><div style={{fontSize:10,color:"#666"}}>TUTAENDELEA</div><div style={{height:6,background:"#182a1e",borderRadius:99,marginTop:8}}><div style={{height:6,width:(100-wp)+"%",background:"#22c55e",borderRadius:99}}></div></div></div>
      </div>
      <div style={{textAlign:"center",marginTop:10,fontSize:12,color:"#666"}}>{wp}% WANTAM • {100-wp}% TUTAM</div>
    </div>

    <div style={{margin:"0 16px",background:"#101010",border:"1px solid #1f1f1f",borderRadius:20,padding:14}}>
      <div style={{display:"flex",gap:10}}><img src="https://i.pravatar.cc/150?u=oratah" style={{width:36,height:36,borderRadius:99}}/><textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Sema ukweli wako... #WANTAM or #TUTAM?" style={{flex:1,background:"#0a0a0a",color:"white",border:"1px solid #222",borderRadius:14,padding:12,fontSize:15}} rows={2}></textarea></div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}><div style={{display:"flex",gap:6}}><button onClick={()=>setText("#WANTAM ")} style={{fontSize:11,padding:"6px 10px",borderRadius:99,background:"#ef444422",border:"1px solid #ef444433",color:"#ef4444"}}>#WANTAM 🔥</button><button onClick={()=>setText("#TUTAM ")} style={{fontSize:11,padding:"6px 10px",borderRadius:99,background:"#22c55e22",border:"1px solid #22c55e33",color:"#22c55e"}}>#TUTAM 💚</button></div><button onClick={createPost} style={{background:"white",color:"black",padding:"9px 18px",borderRadius:99,fontWeight:800,border:"none"}}>Post - Sauti →</button></div>
    </div>

    <div style={{marginTop:16}}>
      {posts.map((p)=>{const tot=(p.poll?.wantam||0)+(p.poll?.tutam||0);const pp=tot?Math.round((p.poll?.wantam||0)/tot*100):50; const my=p.poll?.votes?.me; return(
        <div key={p.id} style={{margin:"0 16px 12px 16px",background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:20,padding:14}}>
          <div style={{display:"flex",gap:10}}><img src={p.avatar} style={{width:36,height:36,borderRadius:99}}/><div><div style={{fontWeight:700,fontSize:14}}>{p.name} <span style={{color:"#555"}}>{p.handle}</span></div><div style={{marginTop:4,fontSize:15,lineHeight:1.4}}>{p.text}</div></div></div>
          <div style={{marginTop:12,background:"#050505",border:"1px solid #1a1a1a",borderRadius:14,padding:10}}><div style={{height:8,background:"#1a1a1a",borderRadius:99,display:"flex",overflow:"hidden"}}><div style={{width:pp+"%",background:"#ef4444"}}></div><div style={{width:(100-pp)+"%",background:"#22c55e"}}></div></div><div style={{display:"flex",gap:8,marginTop:10}}><button onClick={()=>vote(p,"wantam")} style={{flex:1,padding:11,borderRadius:12,fontWeight:800,background:my==="wantam"?"#ef4444":"#1a1a1a",color:"white",border:"1px solid #222",fontSize:12}}>🔥 {p.poll?.wantam||0}</button><button onClick={()=>vote(p,"tutam")} style={{flex:1,padding:11,borderRadius:12,fontWeight:800,background:my==="tutam"?"#16a34a":"#1a1a1a",color:"white",border:"1px solid #222",fontSize:12}}>💚 {p.poll?.tutam||0}</button></div></div>
        </div>
      )})}
    </div>
  </div>)
}
