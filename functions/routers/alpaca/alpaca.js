//new
var express = require('express')
var router = express.Router()
var Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
  keyId: 'PKTAUBK5QQLBO0AS5DAI',
  secretKey: 'dRMZkItp02LeYLTYAdDByXAR7O7CpuXZibQwcbfe',
  paper: true,
})
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  alpaca.getAccount().then((account) => {
    throw res.send(account)

  }).catch().catch(error => {
    console.log("Got an error", error);
  });

})

// define the about route
router.post('/', (req, res) => {
  lyrics = " Blackbird singing in the dead of night \n Take these broken wings and learn to fly \n All your life \n You were only waiting for this moment to ariseBlackbird singing in the dead of night \n Take these sunken eyes and learn to see \n All your life \n You were only waiting for this moment to be free \n Blackbird fly, blackbird fly \n Into the light of the dark black night \n Blackbird fly, blackbird fly \n Into the light of the dark black night \n Blackbird singing in the dead of night \n Take these broken wings and learn to fly \n All your life \n You were only waiting for this moment to arise \n You were only waiting for this moment to arise \n You were only waiting for this moment to arise \n"

  throw res.send(lyrics)
})

module.exports = router
