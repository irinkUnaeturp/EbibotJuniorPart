import * as crypto from 'crypto';
import fetch from 'node-fetch';

const apiKey = "xpW2DQ7XHjrHm9D113h53Du1vPuKfr8lsxT5LXGh6UvYVyp4zT7KXqEpeRNLy4k7";
const apiSecret = "er0nlJSSFAt4cHhBWrue07jEw19kQXWMcfQbdPLmdd8SQwwkc0CsA0ZhSZF6bdcB";

const timestamp = Date.now();
const params = {
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '1.0000000',
  price: '0.20',
  timestamp: timestamp.toString(),
};

const privateKey = `er0nlJSSFAt4cHhBWrue07\n` +
                   `jEw19kQXWMcfQbdPLmdd8SQ\n` +
                   `wwkc0CsA0ZhSZF6bdcB`; 

const signPayload = (privateKey: string, payload: string): string => {
  const sign = crypto.createSign('RSA-SHA256');
  sign.write(payload);
  sign.end();
  return sign.sign(privateKey, 'base64');
};

const generateSignature = (queryString: string, apiSecret: string): string => {
    return crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
  };
  
  const signature = generateSignature( 'https://api.binance.com/api/v3/order', apiSecret)

const sendRequest = async () => {
  try {
    const headers = {
      'X-MBX-APIKEY': apiKey,
    };

    const response = await fetch('https://api.binance.com/api/v3/order', {
      method: 'POST',
      headers: headers,
      body: new URLSearchParams(params),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

sendRequest();
