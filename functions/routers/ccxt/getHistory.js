var express = require('express')
var router = express.Router()
const ccxt = require('ccxt');
const credentialsBinance = require('../../credentials/binance.json');
const functions = require('firebase-functions');

let db = admin.firestore();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', (req, res) => {
  const symbol = req.query.symbol
  const limit = req.query.limit
  const id = req.query.id
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

  const since = undefined
  const params = {
    'fromId': id, // exchange-specific non-unified parameter name
    // 'fromId': data[i].id.toString(), // exchange-specific non-unified parameter name
  }
  binance.fetchTrades(symbol, since, limit, params).then((dataSet) => {
    var data = [];
    for (i = 0; i < dataSet.length; i++) {
      data.push(filterTicker(dataSet[i]))
      db.doc(`exchanges/${exchangeId}/coins/${symbol.replace("/", "_")}/${data[i].id.toString()}`)
        .set(data[i], { merge: true })
        .then((resp) => {
          console.log(resp)
          res.send(data);
        }).catch(error => {
          console.log("Got an error", error);
        });
    }
  }).catch(error => {
    console.log("Got an error", error);
  });
});

// define the about route
router.post('/', (req, res) => {
})

function filterTicker(dataSet) {
  let info = dataSet.info;
  delete info.price;
  const allowed = ['timestamp', 'datetime', 'symbol', 'id', 'side', 'price',
    'amount', 'cost', 'isBuyerMaker', 'isBestMatch'];
  let data = Object.assign(dataSet, info);
  return Object.keys(data)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
}

module.exports = router;