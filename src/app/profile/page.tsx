"use client"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
function phoneToEmail(p:string){
let n=""
for(let c of p){if("0123456789".includes(c)) n+=c}
if(n.startsWith("0")) n="254"+n.slice(1)
if(!n.startsWith("254")) n="254"+n
return "u"+n+"@sautipoll.com"
}
export default function Auth(){
const [m,setM]=useState("login")
const [phone,setPhone]=useState("")
const [pass,setPass]=useState("")
const [userName,setUserName]=useState("")
const [msg,setMsg]=useState("")
const [user,setUser]=useState<any>(null)
useEffect(()=>{supabase.auth.getUser().then(r=>setUser(r.data.user))},[])
const signup=async()=>{
if(phone.length<9) return setMsg("Enter phone e.g. 0712345678")
setMsg("Creating...")
const email=phoneToEmail(phone)
const {data,error}=await supabase.auth.signUp({email,password:pass})
if(error) return setMsg(error.message)
await supabase.from("profiles").upsert({id:data.user!.id,username:userName,phone:phone})
setMsg("Account created! Now login")
setM("login")
}
const login=async()=>{
setMsg("Logging...")
const email=phoneToEmail(phone)
const {error}=await supabase.auth.signInWithPassword({email,password:pass})
if(error) setMsg(error.message); else location.href="/"
}
if(user) return <div className="min-h-screen bg-black text-white p-8 text-center pt-20"><h1 className="text-2xl font-black">Karibu!</h1><p className="mt-2">{user.email}</p><a href="/" className="block mt-8 bg-white text-black py-4 rounded-2xl font-black">Go Home</a></div>
return(
<div className="min-h-screen bg-black text-white p-6 flex justify-center">
<div className="w-full max-w-sm">
<h1 className="text-3xl font-black text-center mt-10">SautiPoll 2027</h1>
<div className="flex bg-zinc-900 rounded-full p-1 mt-6 border border-zinc-800">
<button onClick={()=>setM("login")} className={m=="login"?"flex-1 bg-white text-black py-2.5 rounded-full font-bold":"flex-1 text-zinc-500 py-2.5"}>Login</button>
<button onClick={()=>setM("signup")} className={m=="signup"?"flex-1 bg-white text-black py-2.5 rounded-full font-bold":"flex-1 text-zinc-500 py-2.5"}>Create</button>
</div>
<div className="bg-zinc-900 rounded-3xl p-6 mt-6 border border-zinc-800 space-y-4">
{m=="signup"&&<><input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Username" className="w-full bg-black border border-zinc-800 rounded-xl p-4"/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone 0791102687" className="w-full bg-black border border-zinc-800 rounded-xl p-4"/><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full bg-black border border-zinc-800 rounded-xl p-4"/><button onClick={signup} className="w-full bg-green-600 py-4 rounded-xl font-black">Create Account</button></>}
{m=="login"&&<><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone 0791102687" className="w-full bg-black border border-zinc-800 rounded-xl p-4"/><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full bg-black border border-zinc-800 rounded-xl p-4"/><button onClick={login} className="w-full bg-white text-black py-4 rounded-xl font-black">Login</button></>}
{msg&&<p className="text-xs text-center bg-zinc-800 p-3 rounded-xl">{msg}</p>}
</div>
</div>
</div>
)
}
