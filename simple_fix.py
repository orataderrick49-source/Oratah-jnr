c=open('index.html','r',encoding='utf-8').read()
# Make tabs scrollable
c=c.replace('style="display:flex;','style="display:flex;overflow-x:auto;')
# Fix JS - simpler working version
js="""
<script>
document.addEventListener('click', function(e){
  let btn=e.target;
  if(!btn.textContent) return;
  let txt=btn.textContent.trim().toLowerCase();
  if(txt=='tiktok'){
    document.querySelectorAll('div[style*="grid"]').forEach(g=>{
      if(!g.closest('#tiktok-bundles')) g.style.display='none';
    });
    let t=document.getElementById('tiktok-bundles');
    if(t){ t.style.display='block'; }
    document.querySelectorAll('.tab-btn').forEach(b=>{b.style.background='transparent';b.style.color='#facc15';});
    btn.style.background='#facc15';btn.style.color='black';
  }
  if(txt=='data'){
    document.querySelectorAll('div[style*="grid"]').forEach(g=>{g.style.display='grid';});
    let t=document.getElementById('tiktok-bundles');
    if(t){ t.style.display='none'; }
    document.querySelectorAll('.tab-btn').forEach(b=>{b.style.background='transparent';b.style.color='#facc15';});
    btn.style.background='#facc15';btn.style.color='black';
  }
});
</script>
"""
if 'simple tab fix' not in c.lower():
  c=c.replace('</body>', js+'\n</body>')
open('index.html','w',encoding='utf-8').write(c)
print('FIXED simple')
