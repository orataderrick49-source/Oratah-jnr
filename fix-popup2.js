// FIX: Ondoa confirm ya zamani, weka Popup 2
window.payWithWallet = function(amount, title) {
  // Badala ya confirm mbaya, fungua Popup 2
  openModal(title, amount);
  return false; // usiendelee na confirm
};

function openModal(name, price) {
  const wallet = parseFloat(localStorage.getItem('ojn_wallet')||'0');
  document.getElementById('mItem').textContent = name;
  document.getElementById('mAmt').textContent = 'KSH ' + price.toLocaleString() + '.00';
  document.getElementById('mBal').textContent = 'KSH ' + wallet.toLocaleString() + '.00';
  const rem = wallet - price;
  document.getElementById('mRem').textContent = 'Remaining: KSH ' + rem.toLocaleString() + '.00';
  document.getElementById('mRem').style.color = rem >= 0 ? '#f9e79f' : '#ef4444';
  const btn = document.getElementById('mBtn');
  btn.disabled = wallet < price;
  btn.textContent = wallet >= price ? 'Deduct from Wallet' : 'Insufficient Balance - Add Funds';
  window.currentPay = {name, price};
  document.getElementById('modal').classList.add('show');
}
function closeModal(){document.getElementById('modal').classList.remove('show');}
function confirmPay(){
  let phone = document.getElementById('mPhone').value.trim();
  if(phone.length < 10){alert('Weka namba sahihi 07...'); return;}
  let w = parseFloat(localStorage.getItem('ojn_wallet')||'0');
  if(w < window.currentPay.price){alert('Balance haitoshi!'); return;}
  w -= window.currentPay.price;
  let h = JSON.parse(localStorage.getItem('ojn_history')||'[]');
  h.unshift({type:'PURCHASE', title: window.currentPay.name + ' - ' + phone, amount: window.currentPay.price, date: new Date().toLocaleString()});
  localStorage.setItem('ojn_wallet', w);
  localStorage.setItem('ojn_history', JSON.stringify(h));
  document.getElementById('walletBal').textContent = 'KES ' + w.toLocaleString();
  closeModal();
  document.getElementById('mPhone').value='';
  alert('✅ SUCCESS!\n\n' + window.currentPay.name + ' - KES ' + window.currentPay.price + '\nPhone: ' + phone + '\nBalance: KES ' + w + '\n\nIta-deliver 10-30 sec!');
}
// Remove old onclick handlers
document.querySelectorAll('.buy').forEach(b=>{
  b.setAttribute('onclick','');
  b.addEventListener('click', function(){
    const card = this.closest('.card');
    const name = card.querySelector('h3').innerText;
    const price = parseInt(card.querySelector('.price').innerText.replace(/[^0-9]/g,''));
    openModal(name, price);
  });
});
