/* ORATAH JNR WALLET SYSTEM */
let wallet = parseFloat(localStorage.getItem('ojn_wallet')||'0');
let history = JSON.parse(localStorage.getItem('ojn_history')||'[]');
function saveWallet(){localStorage.setItem('ojn_wallet',wallet);localStorage.setItem('ojn_history',JSON.stringify(history));updateWalletUI();}
function updateWalletUI(){const el=document.getElementById('walletBal');if(el)el.textContent='KES '+wallet.toLocaleString();const mob=document.getElementById('walletBalM');if(mob)mob.textContent='KES '+wallet.toLocaleString();}
function addFunds(){let amt=prompt('Weka kiasi cha ku-add (KES):','1000');if(!amt)return;amt=parseFloat(amt);if(isNaN(amt)||amt<10)return alert('Kiasi si sahihi');wallet+=amt;history.unshift({type:'DEPOSIT',amount:amt,date:new Date().toLocaleString(),id:'MPESA-'+Math.random().toString(36).slice(2,8).toUpperCase()});saveWallet();alert('✅ KES '+amt+' imeongezwa! Balance: KES '+wallet);}
function payWithWallet(amount,title){if(wallet<amount){if(confirm('Balance haitoshi! Una KES '+wallet+'. Unataka ku-add funds?'))addFunds();return false;}if(!confirm('Lipa KES '+amount+' kwa \"'+title+'\" kutoka wallet?'))return false;wallet-=amount;history.unshift({type:'PURCHASE',title:title,amount:amount,date:new Date().toLocaleString()});saveWallet();return true;}
function showHistory(){if(!history.length)return alert('Hakuna transactions bado');let t='WALLET HISTORY:\n\n';history.slice(0,15).forEach(h=>{t+=`${h.date} - ${h.type} - ${h.title||''} KES ${h.amount}\n`});alert(t);}
document.addEventListener('DOMContentLoaded',updateWalletUI);
