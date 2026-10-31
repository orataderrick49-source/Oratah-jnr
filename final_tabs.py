c=open('index.html','r',encoding='utf-8').read()
import re

# Remove all old tiktok tab insertions and duplicate tab fix scripts to clean
c=re.sub(r'<button class="tab-btn" data-tab="tiktok".*?</button>', '', c, flags=re.DOTALL)
c=re.sub(r'<script id="real-tab-fix">.*?</script>', '', c, flags=re.DOTALL)
c=re.sub(r'<script>.*?document\.addEventListener\(\'click\'.*?tiktok.*?</script>', '', c, flags=re.DOTALL)

# Find and rebuild the tabs container cleanly
# Pattern: 4 buttons Data, Airtime, KPLC, Bills
# We'll replace the whole tabs row with clean 5 buttons

clean_tabs = """
<div id="main-tabs" style="display:flex; gap:10px; padding:12px; overflow-x:auto; white-space:nowrap; scrollbar-width:none;">
  <button class="tab-btn" data-tab="data" style="border:1px solid #facc15; color:black; background:#facc15; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0;">Data</button>
  <button class="tab-btn" data-tab="airtime" style="border:1px solid #facc15; color:#facc15; background:transparent; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0;">Airtime</button>
  <button class="tab-btn" data-tab="kplc" style="border:1px solid #facc15; color:#facc15; background:transparent; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0;">KPLC</button>
  <button class="tab-btn" data-tab="bills" style="border:1px solid #facc15; color:#facc15; background:transparent; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0;">Bills</button>
  <button class="tab-btn" data-tab="tiktok" style="border:1px solid #fe2c55; color:#fe2c55; background:transparent; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0;">TikTok</button>
</div>
<style>#main-tabs::-webkit-scrollbar{display:none;}</style>
"""

# Replace first occurrence of tabs - look for Data button area
# Simple: replace from first Data button to Bills button area
try:
    # Find start of tabs
    start = c.find('data-tab="data"')
    if start==-1: start = c.find('>Data<')
    if start!=-1:
        # find surrounding div
        div_start = c.rfind('<div', 0, start)
        # find end of tabs div (next </div> after Bills)
        bills_pos = c.find('>Bills<', start)
        if bills_pos!=-1:
            div_end = c.find('</div>', bills_pos) + 6
            c = c[:div_start] + clean_tabs + c[div_end:]
except:
    pass

# If not found, insert clean tabs after header
if 'id="main-tabs"' not in c or c.count('id="main-tabs"')>1:
    # remove duplicates keep one
    c = re.sub(r'<div id="main-tabs".*?</div>\s*<style>.*?</style>', '', c, flags=re.DOTALL)
    c = c.replace('</header>', '</header>\n'+clean_tabs, 1)
    if '</header>' not in c:
        # after ORATAH title
        c = c.replace('Trusted</div>', 'Trusted</div>\n'+clean_tabs, 1)

# Final working JS for all tabs
final_js = """
<script id="tabs-final">
document.addEventListener('DOMContentLoaded', ()=>{
  const tabs=document.querySelectorAll('#main-tabs .tab-btn');
  const tiktok=document.getElementById('tiktok-bundles');
  function showTab(name){
    tabs.forEach(b=>{
      if(b.dataset.tab===name){ b.style.background='#facc15'; b.style.color='black'; b.style.border='1px solid #facc15'; }
      else if(b.dataset.tab==='tiktok'){ b.style.background='transparent'; b.style.color='#fe2c55'; b.style.border='1px solid #fe2c55'; }
      else { b.style.background='transparent'; b.style.color='#facc15'; b.style.border='1px solid #facc15'; }
    });
    // Hide/show content
    const allGrids=document.querySelectorAll('div[style*="grid"]');
    if(name==='tiktok'){
      allGrids.forEach(g=>{ if(!g.closest('#tiktok-bundles')) g.style.display='none'; });
      if(tiktok){ tiktok.style.display='block'; const inner=tiktok.querySelector('div'); if(inner) inner.style.display='grid'; }
      // Hide bills form, airtime form etc if they are outside grid
      document.querySelectorAll('[id*="bill"], [id*="kplc"], [id*="airtime"]').forEach(el=>{
        if(el.id!=='tiktok-bundles' && !el.closest('#tiktok-bundles')) {
          // keep but hide if it's main section
        }
      });
    } else if(name==='data'){
      allGrids.forEach(g=>{ if(!g.closest('#tiktok-bundles')) g.style.display='grid'; });
      if(tiktok) tiktok.style.display='none';
    } else {
      // For airtime,kplc,bills - show their forms, hide data grids and tiktok
      allGrids.forEach(g=>{ g.style.display='none'; });
      if(tiktok) tiktok.style.display='none';
      // Try to show relevant section by text search - will be handled by original site logic if exists
      // Force reload to show original behavior for other tabs
      location.hash=name;
      setTimeout(()=>{ allGrids.forEach(g=>{ if(!g.closest('#tiktok-bundles')) g.style.display='grid'; }); },100);
    }
  }
  tabs.forEach(b=>b.addEventListener('click', ()=>showTab(b.dataset.tab)));
  // Default data active
  showTab('data');
});
</script>
"""

# Clean old tab scripts
c=re.sub(r'<script id="tabs-final">.*?</script>', '', c, flags=re.DOTALL)
c=c.replace('</body>', final_js + '\n</body>')

open('index.html','w',encoding='utf-8').write(c)
print('TABS FIXED - 5 separate buttons')
