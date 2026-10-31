c=open('index.html','r',encoding='utf-8').read()

# 1. Add TikTok button next to Bills if not there
if '>TikTok<' not in c:
    # Find Bills button and add after it
    c = c.replace('>Bills</button>', '>Bills</button>\n<button class="tab-btn" data-tab="tiktok" style="border:1px solid #facc15;color:#facc15;background:transparent;padding:10px 22px;border-radius:25px;margin-left:8px;font-weight:bold;">TikTok</button>')
    # Alternative pattern with different casing
    c = c.replace('>Bills<', '>Bills</button>\n<button class="tab-btn" data-tab="tiktok" style="border:1px solid #facc15;color:#facc15;background:transparent;padding:10px 22px;border-radius:25px;margin-left:8px;font-weight:bold;">TikTok</button>\n<button style="display:none">Bills<')

# 2. Create TikTok cards section same style as Data (yellow cards)
tiktok_section = """
<!-- TIKTOK TAB SECTION - Same style as Data -->
<div id="tiktok-bundles" class="bundle-section" style="display:none; padding:10px;">
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
    
    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">2GB TikTok</div>
      <div style="color:#888; font-size:12px;">24hrs</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">30</div>
      <button onclick="buyBundle('2GB TikTok - 24hrs',30)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold; cursor:pointer;">Buy Now</button>
    </div>

    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">5GB TikTok</div>
      <div style="color:#888; font-size:12px;">7 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">100</div>
      <button onclick="buyBundle('5GB TikTok - 7 Days',100)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold; cursor:pointer;">Buy Now</button>
    </div>

    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center; border:1px solid #fe2c55;">
      <div style="color:white; font-weight:bold;">💎 15GB TikTok</div>
      <div style="color:#888; font-size:12px;">30 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">350</div>
      <button onclick="buyBundle('15GB TikTok - 30 Days',350)" style="background:#fe2c55; color:white; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold; cursor:pointer;">Buy Now</button>
    </div>

    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">10GB TikTok</div>
      <div style="color:#888; font-size:12px;">14 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">200</div>
      <button onclick="buyBundle('10GB TikTok - 14 Days',200)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold; cursor:pointer;">Buy Now</button>
    </div>

  </div>
</div>

<script>
// Make TikTok tab work without breaking other tabs
(function(){
  const tikBtn = document.querySelector('[data-tab="tiktok"]');
  const tikSection = document.getElementById('tiktok-bundles');
  // Find all sections - try common ids/classes
  function hideAll(){
    document.querySelectorAll('.bundle-section, [id*=\"bundle\"], [class*=\"data\"], [class*=\"airtime\"], [class*=\"kplc\"], [class*=\"bills\"]').forEach(el=>{
      if(el.id !== 'tiktok-bundles' && el.id !== 'mpesaModal'){
        // keep only tiktok visible logic via style
        if(el.id && el.id.includes('tiktok')) return;
        if(el.style.display !== 'none' && el.closest('body')){
          // don't hide modal
        }
      }
    });
    // hide common data grids - look for grid containers
    const allGrids = document.querySelectorAll('div[style*=\"grid\"]');
    allGrids.forEach(g=>{
      if(!g.closest('#tiktok-bundles')){
        g.parentElement && g.parentElement.id !== 'tiktok-bundles' ? null : null;
      }
    });
  }
  if(tikBtn){
    tikBtn.addEventListener('click', function(){
      // hide other main grids
      document.querySelectorAll('body > div > div[style*=\"grid\"]').forEach(el=>{
        if(!el.closest('#tiktok-bundles') && !el.closest('#mpesaModal')){
          el.style.display='none';
        }
      });
      // show tiktok
      if(tikSection) tikSection.style.display='block';
      // active style
      document.querySelectorAll('.tab-btn').forEach(b=>{b.style.background='transparent'; b.style.color='#facc15';});
      tikBtn.style.background='#facc15'; tikBtn.style.color='black';
    });
  }
  // Data tab click - hide tiktok again
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    if(btn.dataset.tab !== 'tiktok'){
      btn.addEventListener('click', function(){
        if(tikSection) tikSection.style.display='none';
        // show back grids
        document.querySelectorAll('body > div > div[style*=\"grid\"]').forEach(el=>{
          if(!el.closest('#tiktok-bundles')) el.style.display='grid';
        });
      });
    }
  });
})();
</script>
"""

# Insert tiktok section right after the tabs container - find first grid
if 'tiktok-bundles' not in c:
    # Insert before first occurrence of 1GB Daily
    if '1GB Daily' in c:
        c = c.replace('1GB Daily', tiktok_section + '\n1GB Daily', 1)
    else:
        c = c.replace('</body>', tiktok_section + '\n</body>')

open('index.html','w',encoding='utf-8').write(c)
print('TIKTOK TAB ADDED - Same style as Data')
