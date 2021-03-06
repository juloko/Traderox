const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const engine = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const serviceAccountKey = require('./credentials/serviceAccountKey.json');


//Init firebase.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://traderox.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true });

// Automatically allow cross-origin requests
app.use(cors());

//Routers requires and calls.
app.use('/testRead', require('./routers/test/testRead'))
app.use('/birds', require('./routers/test/birds'))
app.use('/alpaca', require('./routers/alpaca/alpaca'))
app.use('/getExchanges', require('./routers/ccxt/getExchanges'))

//Define of browser request.
app.engine('html', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'html');
app.use(cookieParser('1lum1n3'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Render the htmls.
app.get('/home', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('home');
});

app.get('/', (req, res) => {
    res.render('home');
});

//Brasiliex API
app.use('/getMarket', require('./routers/ccxt/getMarket'))
app.use('/getNowTick', require('./routers/ccxt/getNowTick'))


exports.app = functions.https.onRequest(app);
