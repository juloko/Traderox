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
    res.send(await binance.loadMarkets());
  })();
})
// define the about route
router.post('/', (req, res) => {
})

module.exports = router
