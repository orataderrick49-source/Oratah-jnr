html = open('index.html','r',encoding='utf-8').read()

# 1. Delete every tab button we created
import re
html = re.sub(r'<button[^>]*data-tab="tiktok"[^>]*>.*?</button>', '', html, flags=re.DOTALL|re.IGNORECASE)
html = re.sub(r'<div id="main-tabs".*?</div>\s*<style>.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<script id=".*tab.*">.*?</script>', '', html, flags=re.DOTALL|re.IGNORECASE)

# 2. Find the GOOD original tabs row - it has 4 buttons
# We will inject TikTok correctly after Bills
# Look for Bills button
bills_pattern = r'(<button[^>]*>\s*Bills\s*</button>)'
match = re.search(bills_pattern, html, re.IGNORECASE)
if match:
    bills_btn = match.group(1)
    # Create tiktok btn same style as bills but pink border
    tiktok_btn = bills_btn.replace('Bills','TikTok').replace('bills','tiktok').replace('#facc15','#fe2c55').replace('facc15','fe2c55')
    # If replace didn't change color, manually set
    if 'fe2c55' not in tiktok_btn:
        tiktok_btn = '<button class="tab-btn" data-tab="tiktok" style="border:1px solid #fe2c55; color:#fe2c55; background:transparent; padding:12px 22px; border-radius:25px; font-weight:bold; flex-shrink:0; margin-left:8px;">TikTok</button>'
    new_row = bills_btn + '\n' + tiktok_btn
    html = html.replace(bills_btn, new_row, 1)
    print("Added TikTok after Bills")
else:
    print("Bills not found - trying alternative")
    # fallback: add after KPLC or anywhere
    html = html.replace('>KPLC<', '>KPLC<', 1)

# 3. Ensure tabs container scrolls
html = html.replace('overflow: hidden', 'overflow-x: auto')
# Add scroll style to parent of tabs if needed
html = html.replace('display:flex; gap', 'display:flex; overflow-x:auto; gap', 1)

# 4. Add SUPER SIMPLE JS - no rebase errors
simple_js = """
<script id="fix-final-simple">
document.addEventListener('DOMContentLoaded', function(){
  const tiktokSec = document.getElementById('tiktok-bundles');
  if(!tiktokSec) return;
  function setActive(clicked){
    document.querySelectorAll('.tab-btn').forEach(b=>{
      if(b===clicked){ b.style.background='#facc15'; b.style.color='black'; }
      else { 
        if(b.dataset.tab==='tiktok'){ b.style.background='transparent'; b.style.color='#fe2c55'; }
        else { b.style.background='transparent'; b.style.color='#facc15'; }
      }
    });
  }
  document.addEventListener('click', function(e){
    let btn = e.target.closest('.tab-btn');
    if(!btn) return;
    let tab = (btn.dataset.tab || btn.textContent).toLowerCase().trim();
    if(tab==='tiktok'){
      e.preventDefault();
      setActive(btn);
      // Hide all grids except tiktok
      document.querySelectorAll('body div[style*="grid"]').forEach(g=>{
        if(g.closest('#tiktok-bundles')){ g.style.display='grid'; }
        else { g.style.display='none'; }
      });
      tiktokSec.style.display='block';
      tiktokSec.style.visibility='visible';
    }
    if(tab==='data'){
      e.preventDefault();
      setActive(btn);
      document.querySelectorAll('body div[style*="grid"]').forEach(g=>{
        g.style.display='grid';
      });
      tiktokSec.style.display='none';
    }
  });
});
</script>
"""
html = html.replace('</body>', simple_js + '</body>')

open('index.html','w',encoding='utf-8').write(html)
print("DONE rebuilt")
