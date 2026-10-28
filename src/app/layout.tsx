import "./globals.css"
export const metadata={title:"SautiPoll 2027"}
export default function RootLayout({children}:{children:React.ReactNode}){
return(<html><body className="bg-black">{children}<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[11px]"><a href="/" className="text-orange-400 font-bold">HOME</a><a href="/map" className="text-zinc-400">MAP</a><a href="/profile" className="text-zinc-400">YOU</a></div></body></html>)
}
