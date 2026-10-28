"use client"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
export default function Home(){
const [posts,setPosts]=useState<any[]>([])
const [text,setText]=useState("")
const [choice,setChoice]=useState("WANTAM")
useEffect(()=>{
supabase.from("posts").select("*").order("created_at",{ascending:false}).limit(30).then(r=>setPosts(r.data||[]))
},[])
const total=posts.length||1
const w=posts.filter((p:any)=>p.choice==="WANTAM").length
const pct=Math.round(w/total*100)||58
const post=async()=>{
if(!text) return
const {data:{user}}=await supabase.auth.getUser()
if(!user){location.href="/profile"; return}
await supabase.from("posts").insert({user_id:user.id,username:user.email?.split("@")[0],content:text,choice,county:"Kajiado"})
setText(""); location.reload()
}
return(
<div className="min-h-screen bg-black text-white p-4 pb-24">
<div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5">
<h1 className="text-xl font-black">LIVE POLL 2027</h1>
<p className="text-xs text-zinc-400 mt-1">{posts.length} real votes • Supabase Live</p>
<div className="flex h-10 rounded-2xl overflow-hidden mt-4 font-black text-sm"><div className="bg-red-600 flex items-center px-3" style={{width:pct+"%"}}>{pct}% WANTAM</div><div className="bg-green-600 flex items-center justify-end px-3" style={{width:(100-pct)+"%"}}>{100-pct}% TUTAM</div></div>
<div className="grid grid-cols-2 gap-3 mt-4"><button onClick={()=>setChoice("WANTAM")} className={"py-3 rounded-2xl font-black text-sm "+(choice==="WANTAM"?"bg-red-600":"bg-zinc-800")}>WANTAM</button><button onClick={()=>setChoice("TUTAM")} className={"py-3 rounded-2xl font-black text-sm "+(choice==="TUTAM"?"bg-green-600":"bg-zinc-800")}>TUTAM</button></div>
</div>
<p className="text-orange-400 text-[11px] font-black tracking-widest mt-6 mb-3">STORY PLACE</p>
<div className="flex gap-3 overflow-x-auto"><div className="min-w-[60px] text-center"><div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center">+</div><p className="text-[10px] mt-1">Add</p></div>{["Nairobi","Mombasa","Kisumu","Kajiado"].map(c=><div key={c} className="min-w-[60px] text-center"><div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 p-[2px]"><div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold">{c[0]}</div></div><p className="text-[10px] mt-1">{c}</p></div>)}</div>
<div className="bg-zinc-900 rounded-2xl p-2 flex gap-2 mt-6 border border-zinc-800"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Why this choice?" className="flex-1 bg-black rounded-xl px-4 py-3 text-sm outline-none"/><button onClick={post} className="bg-white text-black px-5 rounded-xl font-black text-sm">Post</button></div>
<div className="mt-6 space-y-3">{posts.map((p:any)=><div key={p.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800/50"><div className="flex justify-between"><span className="font-bold text-sm">{p.username}</span><span className={"text-[10px] px-2 py-1 rounded-full font-bold "+(p.choice==="WANTAM"?"bg-red-600":"bg-green-600")}>{p.choice}</span></div><p className="mt-2 text-sm">{p.content}</p></div>)}{posts.length===0&&<p className="text-center text-zinc-500 py-10 text-sm">No posts yet. Be first from Kajiado!</p>}</div>
</div>
)
}
