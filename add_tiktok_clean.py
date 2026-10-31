import re
html=open('index.html','r',encoding='utf-8').read()

# Don't touch anything else - just add TikTok button after Bills
if 'data-tab="tiktok"' not in html.lower():
    # Find Bills button exact
    pattern = r'(<button[^>]*>\s*Bills\s*</button>)'
    m=re.search(pattern, html, re.IGNORECASE)
    if m:
        bills = m.group(1)
        # Make TikTok same style as Bills
        tiktok = bills.replace('Bills','TikTok')
        # Make sure it has data-tab
        if 'data-tab' not in tiktok:
            tiktok = tiktok.replace('<button', '<button data-tab="tiktok" ')
        else:
            tiktok = re.sub(r'data-tab="[^"]+"', 'data-tab="tiktok"', tiktok)
        # Insert after Bills with space
        html = html.replace(bills, bills + '\n    ' + tiktok, 1)
        print("Added TikTok button - same way as Bills")

# Add TikTok section - copy Data section structure but with TikTok bundles
if 'tiktok-bundles' not in html:
    tiktok_section = """
<!-- TIKTOK BUNDLES - Same style as Data -->
<div id="tiktok-bundles" style="display:none;">
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:12px;">
    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">2GB TikTok</div>
      <div style="color:#888; font-size:12px;">24hrs</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">30</div>
      <button onclick="buyBundle('2GB TikTok 24hrs',30)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold;">Buy Now</button>
    </div>
    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">5GB TikTok</div>
      <div style="color:#888; font-size:12px;">7 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">100</div>
      <button onclick="buyBundle('5GB TikTok 7 Days',100)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold;">Buy Now</button>
    </div>
    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">15GB TikTok</div>
      <div style="color:#888; font-size:12px;">30 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">350</div>
      <button onclick="buyBundle('15GB TikTok 30 Days',350)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold;">Buy Now</button>
    </div>
    <div style="background:#1a1a1a; border-radius:15px; padding:20px; text-align:center;">
      <div style="color:white; font-weight:bold;">10GB TikTok</div>
      <div style="color:#888; font-size:12px;">14 Days</div>
      <div style="color:#facc15; font-size:32px; font-weight:bold; margin:8px 0;">200</div>
      <button onclick="buyBundle('10GB TikTok 14 Days',200)" style="background:#facc15; color:black; border:none; padding:10px 0; border-radius:25px; width:100%; font-weight:bold;">Buy Now</button>
    </div>
  </div>
</div>
"""
    # Insert before disclaimer or before </body>
    if 'Disclaimer:' in html:
        html = html.replace('Disclaimer:', tiktok_section + '\n  Disclaimer:', 1)
    else:
        html = html.replace('</body>', tiktok_section + '\n</body>')

open('index.html','w',encoding='utf-8').write(html)
print("DONE clean add")
