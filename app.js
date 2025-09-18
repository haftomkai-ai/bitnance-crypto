const charts = {};

// Render wallet
document.addEventListener("DOMContentLoaded", () => {
  const uid = getOrCreateUID();
  document.getElementById("userId").textContent = uid;

  const balances = getUserBalances(uid);
  const walletContainer = document.getElementById("walletContainer");

  symbols.forEach(symbol => {
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
      .then(res => res.json())
      .then(data => {
        const base = symbol.replace("USDT","");
        const coin = coins[base];
        if(!coin) return;

        const balance = balances[base] || 0;
        const usdValue = balance * parseFloat(data.price);

        const row = document.createElement("div");
        row.className = "coin-row";
        row.innerHTML = `
          <img src="${coin.logo}" alt="${coin.name}" class="coin-logo">
          <span class="coin-name">${coin.name} (${base})</span>
          <span class="coin-price">~$${usdValue.toFixed(2)}</span>
        `;
        walletContainer.appendChild(row);
      })
      .catch(err => console.error("Error fetching", symbol, err));
  });

  // Trump coin (static price)
  const trump = coins["TRUMP"];
  const row = document.createElement("div");
  row.className = "coin-row";
  row.innerHTML = `
    <img src="${trump.logo}" alt="${trump.name}" class="coin-logo">
    <span class="coin-name">${trump.name} (TRUMP)</span>
    <span class="coin-price">~$${usdValue.toFixed(2)}</span>
  `;
  walletContainer.appendChild(row);
});

// Example coins info
const coinsInfo = {
  BTC: { name: "Bitcoin", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png" },
  ETH: { name: "Ethereum", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png" },
  SOL: { name: "Solana", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png" },
  ETC: { name: "Ethereum Classic", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/etc.png" },
  TON: { name: "Toncoin", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ton.png" },
  TRUMP: { name: "Trump Coin", logo: "https://cryptologos.cc/logos/trumpcoin-trump-logo.png" },
  XRP: { name: "XRP", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png" },
  BCH: { name: "Bitcoin Cash", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bch.png" },
  DOGE: { name: "Dogecoin", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/doge.png" },
  ADA: { name: "Cardano", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ada.png" },
  DOT: { name: "Polkadot", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png" },
  MATIC: { name: "Polygon", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/matic.png" },
  AVAX: { name: "Avalanche", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png" },
  SHIB: { name: "Shiba Inu", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/shib.png" },
  LTC: { name: "Litecoin", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ltc.png" },
  TRX: { name: "Tron", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/trx.png" },
  ATOM: { name: "Cosmos", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/atom.png" },
  NEAR: { name: "NEAR Protocol", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/near.png" },
  FIL: { name: "Filecoin", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/fil.png" },

  // Added previously
  ICP: { name: "Internet Computer", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/icp.png" },
  APT: { name: "Aptos", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/apt.png" },
  HBAR: { name: "Hedera", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/hbar.png" },
  OP: { name: "Optimism", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/op.png" },
  SUI: { name: "Sui", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sui.png" },

  // Newly added 5 most known coins
  ARB: { name: "Arbitrum", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/arb.png" },
  MKR: { name: "Maker", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/mkr.png" },
  AAVE: { name: "Aave", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/aave.png" },
  GRT: { name: "The Graph", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/grt.png" },
  STX: { name: "Stacks", logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/stx.png" }
};




const marketCoins = Object.keys(coinsInfo).map(c=>c+"USDT");
const priceTable = document.getElementById("price-table");

// Simulated wallet balances per user (replace with backend)
function getOrCreateUID() {
  let uid = localStorage.getItem("userUID");
  if(!uid){ uid = Math.floor(100000+Math.random()*900000).toString(); localStorage.setItem("userUID", uid); }
  return uid;
}

// Fetch and display live market + user balances
async function fetchMarketData() {

  for (let symbol of marketCoins) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      const data = await res.json();

      const coin = symbol.replace("USDT", "");
      const price = parseFloat(data.lastPrice);
      const change = parseFloat(data.priceChangePercent);
      const arrow = change >= 0 ? "⬆️" : "⬇️";
      const color = change >= 0 ? "lime" : "red";

      
      

      let tr = document.getElementById(`row-${coin}`);

      if (!tr) {
        // Create row ONCE if it doesn’t exist
        tr = document.createElement("tr");
        tr.id = `row-${coin}`;
        tr.innerHTML = `
          <td><img src="${coinsInfo[coin].logo}" width="20"> ${coin}</td>
          <td id="price-${coin}">$${price.toFixed(2)}</td>
          <td id="change-${coin}" style="color:${color}">${arrow} ${Math.abs(change).toFixed(2)}%</td>
          <td><canvas id="chart-${coin}" width="100" height="30"></canvas></td>
        `;
        priceTable.appendChild(tr);

        // Create chart only once
        const klinesRes = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=10`);
        const klines = await klinesRes.json();
        const prices = klines.map(k => parseFloat(k[4]));

        const ctx = document.getElementById(`chart-${coin}`).getContext("2d");
        charts[coin] = new Chart(ctx, {
          type: "line",
          data: {
            labels: prices.map((_, i) => i + 1),
            datasets: [{
              data: prices,
              borderColor: color,
              borderWidth: 1,
              pointRadius: 0,
              fill: false,
              tension: 0.3
            }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true, callbacks: { label: ctx => `$${ctx.raw.toFixed(2)}` } }
            },
            scales: { x: { display: false }, y: { display: false } }
          }
        });
      } else {
        // ✅ Update ONLY the dynamic fields
        document.getElementById(`price-${coin}`).textContent = `$${price.toFixed(2)}`;
        document.getElementById(`value-${coin}`).textContent = `$${valueUSD}`;
        const changeEl = document.getElementById(`change-${coin}`);
        changeEl.style.color = color;
        changeEl.textContent = `${arrow} ${Math.abs(change).toFixed(2)}%`;
      
      if (charts[coin]) {
  const data = charts[coin].data.datasets[0].data;
  data.push(price);
  if (data.length > 10) data.shift();   // keep last 10 points
  charts[coin].data.labels = data.map((_, i) => i + 1);
  charts[coin].update();
}
      }
    } catch (err) {
      console.error("Error fetching", symbol, err);
    }
  }
}


// Initial fetch + refresh every 3 seconds
fetchMarketData();
setInterval(fetchMarketData,3000);
