const { CMFutures } = require("@binance/futures-connector");

const ApiKey = "";
const ApiSecret = "";

const cmFuturesClient = new CMFutures(ApiKey, ApiSecret, {
  baseURL: "https://dapi.binance.com",
});

cmFuturesClient
  .newOrder("UNIUSD_PERP", "BUY", "LIMIT", {
    timeInForce: "GTC",
    quantity: 1,
    price: 6,
  })
  .then((response) => console.log(response))
  .catch(console.error);

