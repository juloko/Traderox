var express = require('express')
var router = express.Router()
const ccxt = require('ccxt');
const credentialsBinance = require('../../credentials/binance.json');
const dataSeta = require('./dataSet.json');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("../../credentials/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://traderox.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true });
let db = admin.firestore();

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

  const symbol = 'LTC/BTC';
  const since = undefined
  const limit = 1000 // change for your limit
  const params = {
    'fromId': 66666, // exchange-specific non-unified parameter name
    // 'fromId': data[i].id.toString(), // exchange-specific non-unified parameter name
  }
  binance.fetchTrades(symbol, since, limit, params).then((dataSet) => {
    var data = [];
    var dataSetProm = [];
    for (i = 0; i < dataSet.length; i++) {
      data.push(filterTicker(dataSet[i]))
      dataSetProm[i] = db.doc(`
      exchanges/${exchangeId}/${symbol.replace("/", "_")}/${data[i].id.toString()}`)
        .set(data[i], { merge: true })
    }
    return Promise.all(dataSetProm)
      .then(() => {
        throw res.send(data);
      }).catch(error => {
        console.log("Got an error", error);
      });
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