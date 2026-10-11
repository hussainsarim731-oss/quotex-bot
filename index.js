const API_KEY = "2b4a7f20448a44caa24e0d4025455e49"; // Yahan apni Twelve Data ki key lagayein
const symbol = "EUR/USD";
const interval = "1min";

async function getCandles() {
  try {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=5&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.values) {
      const latestCandle = data.values[0];
      console.log("Live EUR/USD Candle:", {
        time: latestCandle.datetime,
        open: parseFloat(latestCandle.open),
        high: parseFloat(latestCandle.high),
        low: parseFloat(latestCandle.low),
        close: parseFloat(latestCandle.close)
      });
      
      // Yahan aapka bot analysis aur trade logic chalega
      analyzeMarket(latestCandle);
    } else {
      console.log("Data error or limit reached:", data);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

function analyzeMarket(candle) {
  // Aapka bot yahan candle data check karega
  console.log("Analyzing candle close price:", candle.close);
}

// Har 10 second baad live data check karega
setInterval(getCandles, 10000);
