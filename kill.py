import re
s=open('index.html','r',encoding='utf-8').read()
print("Before:", "TIKTOK BUNDLES" in s)
a=s.find('TIKTOK BUNDLES')
if a!=-1:
  b=s.rfind('<div',0,a)
  c=s.find('Disclaimer:',a)
  d=s.rfind('<div',0,c)
  s=s[:b]+s[d:]
  print("Deleted")
s=re.sub(r'<button[^>]*TikTok[^>]*>.*?</button>','',s,flags=re.I|re.S)
open('index.html','w',encoding='utf-8').write(s)
print("After:", "TIKTOK BUNDLES" in s)
