var express = require('express')
var router = express.Router()
const ccxt = require('ccxt');
const credentialsBinance = require('../../credentials/binance.json');


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


// define the home page route
router.get('/', (req, res) => {
  (async function () {

    const exchangeId = 'binance'
      , exchangeClass = ccxt[exchangeId]
      , binance = new exchangeClass({
        'apiKey': credentialsBinance.apiKey,
        'secret': credentialsBinance.secretKey,
        'timeout': 30000,
        'enableRateLimit': true,
        'options': {
          // 'fetchTradesMethod': 'publicGetAggTrades', // default
          // 'fetchTradesMethod': 'publicGetTrades',
          'fetchTradesMethod': 'publicGetHistoricalTrades',
        },

      })

    // console.log(await binance.loadMarkets())

    const symbol = 'LTC/BTC';
    const since = undefined
    const limit = 200 // change for your limit
    const params = {
      'from_id': '465456', // exchange-specific non-unified parameter name
    }

    res.send(await binance.fetchTrades(symbol, since, limit, params));



  })();
})
// define the about route
router.post('/', (req, res) => {
})







module.exports = router
