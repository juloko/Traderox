var express = require('express')
var router = express.Router()
const ccxt = require('ccxt')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
    res.send(ccxt.exchanges)
})

// define the about route
router.post('/', (req, res) => {
})

module.exports = router
