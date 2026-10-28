"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
export default function Board(){
  const [users, setUsers] = useState<any[]>([])
  useEffect(()=>{ supabase.from('profiles').select('*').limit(20).then(({data})=>{ if(data) setUsers(data) }) },[])
  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-black mt-4">People</h1>
      <div className="mt-4 space-y-3">
        {users.map((u:any)=>(
          <div key={u.id} className="bg-zinc-900 p-4 rounded-2xl flex justify-between border border-zinc-800">
            <p className="font-bold">@{u.username}</p><span className="text-zinc-500 text-xs">{u.county || 'Kenya'}</span>
          </div>
        ))}
        {users.length===0 && <p className="text-zinc-500 mt-10 text-center">No profiles yet. Run profiles SQL + create account in /profile</p>}
      </div>
      <a href="/" className="block mt-6 text-center text-zinc-500">Home</a>
    </main>
  )
}
