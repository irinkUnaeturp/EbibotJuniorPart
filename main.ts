const { SPot } = require('@binance/connector')


const apiKey = "";
const apiSecret = "";

const client = new SPot(apiKey, apiSecret,{
  baseURL: 'https://api.binance.com'
})

//Инфа об аккаунте
//client.account().then(response => client.logger.log(response.data))

const placeMarketOrder = async () => {
  const order = await client.newOrder('UNIUSDT','BUY','MARKET',{
    quoteOrderQty: 1
  })
console.log(order.data)
}

const placeLimitOrder = async()=> {
  const order = await client.newOrder('UNIUSDT','BUY', 'LIMIT',{
    price: '5.90',
    quantity: 1,
    timeInForce: 'GTC'
  })
  console.log(order)
}

placeLimitOrder()
