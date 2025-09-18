const coins = { 
  BTC:{name:"Bitcoin",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png"},
  ETH:{name:"Ethereum",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"},
  SOL:{name:"Solana",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png"},
  ETC:{name:"Ethereum Classic",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/etc.png"},
  TON:{name:"Toncoin",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ton.png"},
  XRP:{name:"XRP",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png"},
  BCH:{name:"Bitcoin Cash",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bch.png"},
  DOGE:{name:"Dogecoin",logo:"https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/doge.png"},
  TRUMP:{name:"Trump Coin",logo:"https://cryptologos.cc/logos/trumpcoin-trump-logo.png"}
};

// Generate or get user ID
function getOrCreateUID() {
  let uid = localStorage.getItem("userUID");
  if(!uid){ 
    uid = Math.floor(100000+Math.random()*900000).toString(); 
    localStorage.setItem("userUID", uid); 
  }
  return uid;
}

// Get balances
function getUserBalances(uid){
  let balances = JSON.parse(localStorage.getItem("balances_"+uid));
  if(!balances){
    balances={BTC:0.2,ETH:10,SOL:20.7,ETC:0.0,TON:0.0,XRP:0.0,BCH:0.0,DOGE:0.0,TRUMP:0.0};
    localStorage.setItem("balances_"+uid,JSON.stringify(balances));
  }
  return balances;
}

// Save balances
function saveUserBalances(uid, balances){
  localStorage.setItem("balances_"+uid, JSON.stringify(balances));
}
