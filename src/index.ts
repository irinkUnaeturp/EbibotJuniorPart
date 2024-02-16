import * as crypto from 'crypto';
import axios from 'axios';
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('creds.json', 'utf8'));

const client = createBinanceClient ({
    apiKey: creds.key,
    apiSecret: creds.secret,
});
const baseUrl = 'https://fapi.binance.com';

// Получение времени сервера Binance
const serverTime = new Date().getTime();

// Запрос на информацию о счете;
const orderEndpoint1 = '/fapi/v1/account';
const accountQueryString = `timestamp=${serverTime}`;
const accountSignature = crypto.createHmac('sha256', apiSecret).update(accountQueryString).digest('hex');
const accountUrl = `${baseUrl}${orderEndpoint1}?${accountQueryString}&signature=${accountSignature}`;

axios.get(accountUrl, { headers: { 'X-MBX-APIKEY': apiKey } })
    .then(response => {
        console.log('Account Info:', response.data);
    })
    .catch(error => {
        console.error('Error fetching account info:', error.response.data);
    });

// Запрос на размещение ордера
const orderEndpoint = '/fapi/v1/batchOrders';
const orders = [
    {
        symbol: "BTCUSDT",
        side: 'BUY',
        type: 'LIMIT',
        quantity: 1,
        price: 40000,
        leverage: 20,
        timeInForce: 'GTC',
    },
    {
        symbol: "BTCUSDT",
        side: 'BUY',
        type: 'MARKET',
        quantity: 1,
        leverage: 20,
        timestamp: serverTime,
    },
    {
        symbol: "BTCUSDT",
        side: 'BUY',
        type: 'STOP_MARKET',
        quantity: 1,
        price: 43000,
        leverage: 20,
        timeInForce: 'GTC',
    },
];

const orderData = {
    batchOrders: orders,
    timestamp: serverTime,
};

const orderQueryString = Object.entries(orderData)
    .map(([key, value]) => `${key}=${encodeURIComponent(JSON.stringify(value))}`)
    .join('&');
const orderSignature = crypto.createHmac('sha256', apiSecret).update(orderQueryString).digest('hex');
const orderUrl = `${baseUrl}${orderEndpoint}?${orderQueryString}&signature=${orderSignature}`;

axios.post(
    orderUrl,
    null,
    {
        headers: {
            'X-MBX-APIKEY': apiKey,
        },
    },
)
    .then(response => {
        console.log('Order Placement Response:', response.data);
    })
    .catch(error => {
        console.error('Error placing order:', error.response.data);
    });
