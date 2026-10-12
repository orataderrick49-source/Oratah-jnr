const SAF_ROUTE = `
app.post('/api/ussd-saf', (req,res)=>{
  const { text } = req.body;
  let t = text ? text.split('*') : [];
  let response = '';
  const safBundles = allBundles.filter(b=>b.cat=='safaricom' || b.cat=='affordable');

  if(text == '' || text == null){
    response = "CON ORATAH JNR DATA SOLUTION - SAF\n";
    safBundles.slice(0,7).forEach((b,i)=>{
      response += (i+1)+". "+b.name+" @"+b.price+"\\n";
    });
    response += "8. More offers\\n";
  } else if(t.length == 1){
    let idx = parseInt(t[0])-1;
    if(idx >=0 && idx < safBundles.length){
      let b = safBundles[idx];
      response = "CON "+b.name+" KES"+b.price+"\\nEnter M-PESA phone:\\n";
      req.app.locals.tempBundle = b;
    } else {
      response = "CON MORE OFFERS:\\n";
      safBundles.slice(7,14).forEach((b,i)=>{
        response += (i+8)+". "+b.name+" @"+b.price+"\\n";
      });
    }
  } else if(t.length == 2){
    let phone = t[1];
    let b = req.app.locals.tempBundle || safBundles[0];
    // trigger STK here
    console.log("SAF ORDER:", phone, b);
    response = "END ✅ ORATAH JNR: Order for "+b.name+"\\nPhone: "+phone+"\\nYou will get STK prompt.\\nThanks!";
  }
  res.set('Content-Type','text/plain'); res.send(response);
});
`;
