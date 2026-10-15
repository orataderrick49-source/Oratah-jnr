content = open('index.html','r',encoding='utf-8').read()

# Add BUY logic + M-Pesa Popup if not there
buy_js = """
<style>
#mpesaModal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;justify-content:center;align-items:center;}
.mpesa-box{background:white;padding:25px;border-radius:15px;text-align:center;max-width:320px;width:90%;color:black;}
.mpesa-box h3{color:#00a651;margin-top:0;}
</style>
<div id="mpesaModal">
  <div class="mpesa-box">
    <h3 id="bundleName">LIPA NA M-PESA</h3>
    <p><b>Till:</b> <span style="font-size:22px;color:#fe2c55;">YOUR_TILL</span></p>
    <p>Amount: <b id="bundlePrice">0</b> BOB</p>
    <p style="font-size:13px;">1. Lipa na M-Pesa<br>2. Tuma Screenshot kwa WhatsApp<br>3. Bundle inaingia 1 min</p>
    <button onclick="document.getElementById('mpesaModal').style.display='none'" style="background:black;color:white;padding:10px 20px;border-radius:10px;border:none;width:100%;margin-top:10px;">Funga</button>
    <a id="waAfterPay" href="https://wa.me/254XXXXXXXXX" style="background:#25D366;color:white;padding:10px 20px;border-radius:10px;text-decoration:none;display:block;margin-top:10px;font-weight:bold;">Tuma Screenshot WhatsApp</a>
  </div>
</div>
<script>
function buyBundle(name, price){
  document.getElementById('bundleName').innerText = name;
  document.getElementById('bundlePrice').innerText = price;
  document.getElementById('waAfterPay').href = "https://wa.me/254XXXXXXXXX?text=Nimelipa%20"+name+"%20-%20"+price+"%20BOB%20-%20Natumia%20screenshot";
  document.getElementById('mpesaModal').style.display='flex';
}
</script>
"""

# Add onclick to existing TikTok rows
content = content.replace('2GB TikTok - 24hrs</span><span', '2GB TikTok - 24hrs</span><span onclick="buyBundle(\'2GB TikTok\',30)" style="cursor:pointer;"')
content = content.replace('5GB TikTok - 7 Days</span><span', '5GB TikTok - 7 Days</span><span onclick="buyBundle(\'5GB TikTok\',100)" style="cursor:pointer;"')
content = content.replace('15GB TikTok - 30 Days</span><span', '15GB TikTok - 30 Days</span><span onclick="buyBundle(\'15GB TikTok\',350)" style="cursor:pointer;"')

# Replace NUNUA KWA WHATSAPP button to have 2 buttons: BUY + WhatsApp
old_btn = 'NUNUA KWA WHATSAPP'
new_btns = '''<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
  <button onclick="buyBundle('TikTok Bundle',30)" style="background:white;color:#fe2c55;padding:12px 20px;border-radius:25px;border:none;font-weight:bold;cursor:pointer;">💳 BUY NOW</button>
  <a href="https://wa.me/254XXXXXXXXX?text=Nataka%20TikTok%20Bundle" style="background:#25D366;color:white;padding:12px 20px;border-radius:25px;text-decoration:none;font-weight:bold;">💬 WHATSAPP</a>
</div>'''

if old_btn in content and 'BUY NOW' not in content:
    content = content.replace('📲 NUNUA KWA WHATSAPP', new_btns)
    # remove duplicate old link wrapper if exists
    # Keep only one

if 'mpesaModal' not in content:
    content = content.replace('</body>', buy_js + '\n</body>')

open('index.html','w',encoding='utf-8').write(content)
print('BUY OPTION ADDED')
