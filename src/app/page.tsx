"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [votes, setVotes] = useState({ wantam: 30324, tutam: 21994 })
  const total = votes.wantam + votes.tutam
  const wantamPct = Math.round((votes.wantam / total) * 100)
  const tutamPct = 100 - wantamPct

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🎙️</div>
          <div>
            <h1 className="font-bold leading-none">SautiPoll 2027</h1>
            <p className="text-xs text-white/60">WANTAM vs TUTAM • LIVE</p>
          </div>
        </div>
        <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          • LIVE 12.4K
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-[600px] mx-auto w-full">
        {/* Main Poll Card */}
        <div className="rounded-[24px] border-t-2 border-red-600 bg-[#111] p-5">
          <h2 className="text-3xl font-black leading-tight">LIVE POLL • WANTAM vs TUTAM</h2>
          <p className="text-white/70 mt-3 text-[15px]">Who should lead Kenya 2027? → {total} votes</p>
          
          <div className="flex h-10 w-full rounded-xl overflow-hidden mt-4 font-bold">
            <div className="bg-red-600 flex items-center px-3" style={{width: `${wantamPct}%`}}>{wantamPct}%</div>
            <div className="bg-green-600 flex items-center justify-end px-3" style={{width: `${tutamPct}%`}}>{tutamPct}%</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={()=>setVotes(v=>({...v, wantam: v.wantam+1}))} className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold">Vote WANTAM</button>
            <button onClick={()=>setVotes(v=>({...v, tutam: v.tutam+1}))} className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold">Vote TUTAM</button>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div className="bg-[#111] rounded-2xl p-3">
              <p className="font-bold">nairobi_youth</p>
              <p className="text-sm text-white/80">We need jobs!! 🔥</p>
            </div>
            <div className="bg-[#111] rounded-2xl p-3">
              <p className="font-bold">mtkenya_girl</p>
              <p className="text-sm text-white/80">WANTAM is future!! 🚀</p>
            </div>
          </div>
          <div className="bg-[#111] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-orange-400 font-bold text-sm">47 COUNTIES</p>
            <div className="text-4xl my-3">🇰🇪</div>
            <p className="text-xs text-white/50">Nairobi • Mombasa • +45</p>
            <button className="mt-3 bg-white/10 px-4 py-2 rounded-full text-sm">View Map →</button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-auto border-t border-white/10 flex justify-around py-3 text-sm">
        <span className="text-green-400 font-bold">🏠 Home</span>
        <span className="text-white/50">🏆 Board</span>
        <span className="text-white/50">🗺️ Map</span>
        <span className="text-white/50">👤 Profile</span>
      </div>
    </div>
  )
}
