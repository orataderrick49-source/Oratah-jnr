import re
html=open('index.html','r',encoding='utf-8').read()

# 1. Remove TikTok bundles section (the red box)
html=re.sub(r'<!-- TIKTOK BUNDLES.*?-->.*?<!--.*?-->', '', html, flags=re.DOTALL)
html=re.sub(r'<div id="tiktok-bundles".*?</div>\s*</div>\s*</div>', '', html, flags=re.DOTALL)
# Simpler: remove from TIKTOK BUNDLES title to its closing
html=re.sub(r'<div[^>]*>\s*🎵\s*TIKTOK BUNDLES.*?\*Works for TikTok.*?</div>\s*</div>', '', html, flags=re.DOTALL|re.IGNORECASE)
html=re.sub(r'<div id="tiktok-bundles".*?</div>\s*</div>', '', html, flags=re.DOTALL)

# 2. Remove any TikTok tab button if we added it (keep original 4 tabs)
html=re.sub(r'<button[^>]*data-tab="tiktok"[^>]*>.*?</button>', '', html, flags=re.DOTALL|re.IGNORECASE)
html=re.sub(r'<button[^>]*>\s*TikTok\s*</button>', '', html, flags=re.IGNORECASE)

# 3. Remove our injected JS for tiktok tabs
html=re.sub(r'<script id=".*tiktok.*">.*?</script>', '', html, flags=re.DOTALL|re.IGNORECASE)
html=re.sub(r'<script id="fix-final-simple">.*?</script>', '', html, flags=re.DOTALL)
html=re.sub(r'<script id="tabs-final">.*?</script>', '', html, flags=re.DOTALL)
html=re.sub(r'<script id="real-tab-fix">.*?</script>', '', html, flags=re.DOTALL)

# Clean double empty divs
html=re.sub(r'\n\s*\n\s*\n', '\n\n', html)

open('index.html','w',encoding='utf-8').write(html)
print("TikTok removed - everything else kept")
