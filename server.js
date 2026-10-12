const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const OFFERS = [
 {id:1, name:"1GB 1HR @19", price:19}, {id:2, name:"1.5GB 1HR @30", price:30},
 {id:3, name:"2GB 1HR @39", price:39}, {id:4, name:"Bingwa 1GB 24HR @19", price:19},
 {id:5, name:"Bingwa 3GB 24HR @49", price:49}, {id:6, name:"5GB 7DAY @95", price:95},
 {id:7, name:"10GB 7DAY @195", price:195}, {id:8, name:"15GB 7DAY @295", price:295},
 {id:9, name:"20GB 7DAY @390", price:390}, {id:10, name:"30GB 7DAY @570", price:570},
 {id:11, name:"10GB 30DAY @500", price:500}, {id:12, name:"20GB 30DAY @990", price:990},
 {id:13, name:"40GB 30DAY @1800", price:1800}, {id:14, name:"3GB 3DAY @55", price:55},
 {id:15, name:"6GB 3DAY @99", price:99}, {id:16, name:"1GB 30DAY @99", price:99},
 {id:17, name:"2GB 30DAY @199", price:199}, {id:18, name:"5GB 30DAY @350", price:350},
 {id:19, name:"8GB 30DAY @450", price:450}, {id:20, name:"2GB 24HR @20", price:20},
 {id:21, name:"5GB 24HR @50", price:50}, {id:22, name:"10GB 24HR @99", price:99},
 {id:23, name:"Bingwa 7GB 7DAY @150", price:150}, {id:24, name:"Bingwa 2GB 1DAY @20", price:20},
 {id:25, name:"Unlimited 1HR @25", price:25}, {id:26, name:"Unlimited 24HR @90", price:90},
 {id:27, name:"50GB 30DAY @2500", price:2500}, {id:28, name:"100GB 30DAY @4000", price:4000},
 {id:29, name:"25GB 7DAY @470", price:470}, {id:30, name:"2.5GB 3DAY @45", price:45},
];

app.get('/', (req,res)=>{
 res.send(`
 <html><head><meta name="viewport" content="width=device-width,initial-scale=1">
 <title>ORATAH JNR DATA SOLUTION</title></head>
 <body style="font-family:Arial;text-align:center;padding:20px;background:#f5f5f5">
 <img src="/logo.webp" style="width:220px;border-radius:20px;margin:20px auto;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
 <h1 style="margin:0">ORATAH JNR</h1>
 <h3 style="color:#00a651;margin:5px 0">DATA SOLUTION</h3>
 <p>Cheap Data Bundles • Kenya • Safaricom • <b>*384*92862#</b></p>
 <div style="background:white;border-radius:12px;padding:15px;max-width:400px;margin:20px auto;text-align:left">
 ${OFFERS.map(o=>`<div style="padding:8px;border-bottom:1px solid #eee;display:flex;justify-content:space-between"><span>${o.id}. ${o.name}</span><b>KES ${o.price}</b></div>`).join('')}
 </div>
 <p style="color:gray">M-PESA STK Push • Instant • 24/7</p>
 </body></html>
 `);
});

app.post('/api/ussd-saf', (req,res)=>{
 let text = req.body.text || "";
 let parts = text.split('*');
 let resp = "";
 if(text == ""){
   resp = "CON ORATAH JNR - CHEAP DATA\n";
   OFFERS.slice(0,5).forEach((b,i)=>{ resp += `${i+1}. ${b.name} @${b.price}\n`; });
   resp += "6. NEXT PAGE";
 } else if(parts.length==1 && parseInt(parts[0])<=30){
   let b = OFFERS[parseInt(parts[0])-1];
   resp = `CON ${b.name} KES${b.price}\nEnter M-PESA number:`;
 } else {
   resp = `END ORATAH JNR: Order for ${parts[1]} received. STK push coming. Thanks!`;
   console.log("NEW ORDER", req.body.phoneNumber, text);
 }
 res.set('Content-Type','text/plain'); res.send(resp);
});

app.listen(3000,'0.0.0.0',()=>console.log('ORATAH JNR with LOGO running on 3000'));
