const express      = require('express')
const cookieParser = require('cookie-parser')
const session      = require('express-session');
const Fcbuffer     = require('fcbuffer')

const eos                = require('modules/eos')
const config             = require('modules/config')
const logger             = require('modules/logger')
const mongooseConnection = require('modules/mongoose-connection')

const raw = require('modules/rawTransaction');

const app = express()

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

app.get('/ping', function(req, res) {
  return res.send('ok');
})

app.get('/api/donation-history', (req, res) => {
  // let mock = '{ "data": [{ "id": "1", "from": "daicuong", "amount": "100", "type": "EOS", "memo": "Hope this help!", "donateDate": 1528553367201, "converToFiatDate": 1528553367201, "fiat": "2000", "status": "donated" }, { "id": "2", "from": "daicuong", "amount": "100", "type": "EOS", "memo": "Hope this help!", "donateDate": 1528553367201, "converToFiatDate": 1528553367201, "fiat": "20000", "status": "inreview" }] }'
  // res.send(JSON.parse(mock))
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

raw.init()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server listening at ${config.port}`);

      // FOR TEST ONLY
      // console.log('create');
      // raw.createTx({from: "sontt", quantity: 100}, (err, res) => {

      //   rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", res);
      //   console.log('rawTx :', rawTx);
      //   raw.sendRawTx(JSON.stringify(rawTx), (err, res) => {
      //     console.log("sendRawTx", err, res);
      //   });

      // })

      // var action = {
      //   "account": "pen",
      //   "name": "issue",
      //   "authorization": [{ "actor": "pen", "permission": "active" }],
      //   "data": {from: "sontt", quantity: 100}
      // }
      // raw.createTx(action, (err, res) => {

      //   rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", res);
      //   console.log('rawTx :', rawTx);
      //   raw.sendRawTx(JSON.stringify(rawTx), (err, res) => {
      //     console.log("sendRawTx", err, res);
      //   });

      // })
    })
  });