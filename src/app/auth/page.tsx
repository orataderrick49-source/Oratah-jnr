"use client"
import { useState } from "react"
export default function Auth(){
 const [step,setStep]=useState(1)
 const [form,setForm]=useState({user:"",phone:"",pass:"",cpass:""})
 const [otp,setOtp]=useState("")
 const [sentOtp,setSentOtp]=useState("")
 
 function createAccount(){
  if(!form.user||!form.phone||!form.pass) return alert("Fill all")
  if(form.pass!==form.cpass) return alert("Passwords no match")
  const code = Math.floor(100000+Math.random()*900000).toString()
  setSentOtp(code)
  alert("OTP sent: "+code+" (in real app via SMS)")
  setStep(2)
 }
 function verify(){
  if(otp===sentOtp){
    localStorage.setItem("sauti_user",JSON.stringify(form))
    alert("Account Created! Welcome @"+form.user)
    location.href="/"
  } else alert("Wrong OTP")
 }

 if(step===2) return(
  <div style={{minHeight:"100vh",background:"#050505",color:"white",display:"grid",placeItems:"center",padding:20}}>
   <div style={{width:"100%",maxWidth:380,background:"#0f0f0f",border:"1px solid #222",borderRadius:24,padding:24}}>
    <h2 style={{fontWeight:900}}>Verify Your Phone</h2>
    <p style={{color:"#888",fontSize:14}}>OTP sent to {form.phone}</p>
    <div style={{display:"flex",gap:8,marginTop:20}}>{[...Array(6)].map((_,i)=><input key={i} maxLength={1} style={{width:45,height:55,textAlign:"center",background:"#111",border:"1px solid #333",borderRadius:12,color:"white",fontSize:20}} onChange={e=>{let v=e.target.value; setOtp(o=>{let arr=o.split(""); arr[i]=v; return arr.join("")})}} />)}</div>
    <button onClick={verify} style={{width:"100%",marginTop:20,padding:14,background:"#f5d76e",color:"black",borderRadius:12,fontWeight:800,border:"none"}}>Verify & Continue</button>
    <p style={{textAlign:"center",marginTop:12,color:"#666",fontSize:12}}>Your OTP: <b style={{color:"#f5d76e"}}>{sentOtp}</b> (demo)</p>
   </div>
  </div>
 )

 return(
 <div style={{minHeight:"100vh",background:"#050505",color:"white",display:"grid",placeItems:"center",padding:20}}>
  <div style={{width:"100%",maxWidth:380,background:"#0f0f0f",border:"1px solid #222",borderRadius:24,padding:24}}>
   <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:30}}>🎙️</div><h1 style={{fontWeight:900,color:"#f5d76e"}}>SAUTI POLL</h1><p style={{color:"#666",fontSize:13}}>Join millions to shape opinion</p></div>
   <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <input placeholder="@username" value={form.user} onChange={e=>setForm({...form,user:e.target.value})} style={{padding:14,background:"#111",border:"1px solid #333",borderRadius:12,color:"white"}} />
    <input placeholder="+254 712 345 678" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{padding:14,background:"#111",border:"1px solid #333",borderRadius:12,color:"white"}} />
    <input type="password" placeholder="Password" value={form.pass} onChange={e=>setForm({...form,pass:e.target.value})} style={{padding:14,background:"#111",border:"1px solid #333",borderRadius:12,color:"white"}} />
    <input type="password" placeholder="Confirm Password" value={form.cpass} onChange={e=>setForm({...form,cpass:e.target.value})} style={{padding:14,background:"#111",border:"1px solid #333",borderRadius:12,color:"white"}} />
    <button onClick={createAccount} style={{padding:14,background:"#f5d76e",color:"black",borderRadius:12,fontWeight:800,border:"none",marginTop:8}}>Create Account</button>
   </div>
   <p style={{textAlign:"center",marginTop:14,fontSize:13,color:"#888"}}>Already have account? <a href="/auth" style={{color:"#22c55e"}}>Log In</a></p>
  </div>
 </div>)
}
