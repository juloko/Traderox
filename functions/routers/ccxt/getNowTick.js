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

  const symbol = req.query.symbol;
  console.log(req.query)
  console.log(symbol)
  const since = undefined
  const limit = 1 // change for your limit
  const params = {
    // 'fromId': 66667, // exchange-specific non-unified parameter name
    // 'fromId': data[i].id.toString(), // exchange-specific non-unified parameter name
  }
  binance.fetchTrades(symbol, since, limit, params).then((dataSet) => {
    res.send(dataSet)
  }).catch(error => {
    console.log("Got an error", error);
  });
});

// define the about route
router.post('/', (req, res) => {
})

module.exports = router;