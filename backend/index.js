const express      = require('express')
const cookieParser = require('cookie-parser')
const session      = require('express-session');
const Fcbuffer     = require('fcbuffer')

const eos                = require('modules/eos')
const config             = require('modules/config')
const logger             = require('modules/logger')
const mongooseConnection = require('modules/mongoose-connection')
const ActionHistory = require('modules/models/action-history')
const Borrower = require('modules/models/borrower')

const raw = require('modules/rawTransaction');

const app = express()

app.use(express.json({
  limit: '100mb',
  strict: true
}))

app.use(cookieParser())
app.use(session({
  name: '__sid',
  secret: config.sessionSecret,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(config.sessionExpire),
    path: '/',
    secure: false,
    httpOnly: false
  },
  store: new session.MemoryStore()
}))

app.post('/api/login', (req, res) => {
  if (req.body.email) {
    console.log(req.body.email)
    Borrower.findOne({email: req.body.email}, (error, borrower) => {
      if (borrower) {
        req.session.authenticated = true;
        req.session.user = {
          id: borrower._id,
          eosAccountName: borrower.eosAccountName,
          role: ['BRORROWER']
        }
        res.send(borrower)
      }
    })
  } else {
    res.status(401).send()
  }
})

app.get('/ping', function(req, res) {
  return res.send('ok');
})

app.get('/api/action-history', (req, res) => {
  ActionHistory.find({}, (error, result) => {
    res.send({data: result})
  })
})


app.post('/api/amdin/issue-token', (req, res) => {
  // returns Promise
  // eos.transaction({
  //   actions: [
  //     {
  //       account: 'pen',
  //       name: 'issue',
  //       authorization: [{
  //         actor: 'pen',
  //         permission: 'active'
  //       }],
  //       data: {
  //         from: 'inita',
  //         to: 'initb',
  //         quantity: '7 SYS',
  //         memo: ''
  //       }
  //     }
  //   ]
  // })

  var action = {
        "account": "pen",
        "name": "issue",
        "authorization": [{ "actor": "pen", "permission": "active" }],
        "data": data
      };
})

app.post('/api/request-borrow', (req, res) => {

  setTimeout(() => {
    raw.createTx({from: "sontt", quantity: 100}, (err, res) => {
      // console.log(err)
      // console.log('================')
      console.log(res)
      //

    })
  }, 1000);

  res.send('OK')
})

app.post('/api/sign-borrow-request', (req, res) => {

})

app.post('/api/admin/approve-borrow-request', (req, res) => {

})


app.use(function(req, res, next) {
  res.status(404).send()
})

app.use(function(err, req, res, next) {
  logger.error(err.stack)
  res.status(500).send('Server Internal Error')
})

const mongooseOptions = {
  auto_reconnect: true,
  reconnectTries: 30,
  reconnectInterval: 1000,
  keepAlive: 30000,
  connectTimeoutMS: 30000,
  autoIndex: true,
  dbName: "pendb"
}

mongooseConnection.connect(config.mongoUri, mongooseOptions)

app.listen(config.port, () => {
  logger.info(`Server listening at ${config.port}`)
})


setTimeout(() => {
raw.createTx({from: "sontt", quantity: 100}, (err, res) => {
  // console.log(err)
  // console.log('================')
  // console.log(res)
})
}, 1000);


const demux = require('modules/demux')
demux.start()
