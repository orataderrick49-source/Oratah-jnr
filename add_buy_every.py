c=open('index.html','r',encoding='utf-8').read()

# Remove the old big single BUY NOW if you want per-item only? We keep both but add small buy on each row
# Add small BUY button on each TikTok row

# For each row, inject a button next to BOB
def add_buy(row_name, price):
    global c
    # Find the row containing that text
    if row_name in c and f'buyBundle(\'{row_name}\'' not in c.split(row_name)[0][-200:]: # avoid double
        pass
    # replace price span with price + buy button
    old1 = f"{price} BOB"
    # we add button after price
    new1 = f"{price} BOB <button onclick=\"buyBundle('{row_name}',{price})\" style=\"background:#fe2c55;color:white;border:none;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-left:10px;cursor:pointer;\">BUY</button>"
    if new1 not in c:
        c = c.replace(old1, new1, 1)

# Do for TikTok bundles - exact names from your HTML
c = c.replace('2GB TikTok - 24hrs</span>', '2GB TikTok - 24hrs</span><span style="display:flex;align-items:center;">')
c = c.replace('5GB TikTok - 7 Days</span>', '5GB TikTok - 7 Days</span><span style="display:flex;align-items:center;">')
c = c.replace('15GB TikTok - 30 Days</span>', '15GB TikTok - 30 Days</span><span style="display:flex;align-items:center;">')

# Clean double opens
c = c.replace('</span><span style="display:flex;align-items:center;"><span', '</span><span style="display:flex;align-items:center;"><span')
# Now add buy buttons
c = c.replace('30 BOB', '30 BOB <button onclick="buyBundle(\'2GB TikTok - 24hrs\',30)" style="background:#fe2c55;color:white;border:none;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-left:10px;cursor:pointer;">BUY</button>', 1)
c = c.replace('100 BOB', '100 BOB <button onclick="buyBundle(\'5GB TikTok - 7 Days\',100)" style="background:#fe2c55;color:white;border:none;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-left:10px;cursor:pointer;">BUY</button>', 1)
c = c.replace('350 BOB', '350 BOB <button onclick="buyBundle(\'15GB TikTok - 30 Days\',350)" style="background:white;color:#fe2c55;border:none;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-left:10px;cursor:pointer;">BUY</button>', 1)

# Close the extra span we opened
c = c.replace('</button></div>', '</button></span></div>')

open('index.html','w',encoding='utf-8').write(c)
print('DONE - Buy on every option added')
