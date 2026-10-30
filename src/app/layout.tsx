export const metadata = { title: 'SautiPoll 🇰🇪', description: 'Sauti ya Mwananchi 2027 - WANTAM vs TUTAM', manifest: '/manifest.webmanifest' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html><body style={{margin:0,background:'#080808'}}>{children}</body></html>
}
