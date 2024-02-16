
const Spot = require('node-binance-api');

const Key = "";
const Secret = "";

const binance = new Spot().options({
  APIKEY: Key,
  APISECRET: Secret,
  baseURL: 'https://fapi.binance.com' // Базовый URL для фьючерсов
});

const quantity = 1
const price = 6
const createTrailingStopOrder = async () => {
  try {
    const stopOrder = await binance.futuresBuy('UNIUSDT', quantity, price, {
      type: 'TRAILING_STOP_MARKET',
      callbackRate: 5
    });
    console.log(stopOrder);
  } catch (error) {
    console.error(error.body);
  }
};

createTrailingStopOrder();