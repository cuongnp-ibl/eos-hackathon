const express      = require('express')
const cookieParser = require('cookie-parser')
const session      = require('express-session');
const Fcbuffer     = require('fcbuffer')

const eos                = require('modules/eos')
const config             = require('modules/config')
const logger             = require('modules/logger')
const mongooseConnection = require('modules/mongoose-connection')

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
  eos.transaction({
    actions: [
      {
        account: 'pen',
        name: 'issue',
        authorization: [{
          actor: 'pen',
          permission: 'active'
        }],
        data: {
          from: 'inita',
          to: 'initb',
          quantity: '7 SYS',
          memo: ''
        }
      }
    ]
  })
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

app.listen(config.port, () => {
  logger.info(`Server listening at ${config.port}`)
})

const raw = require('modules/rawTransaction')

setTimeout(() => {
raw.createTx({from: "sontt", quantity: 100}, (err, res) => {
  // console.log(err)
  // console.log('================')
  // console.log(res)
})
}, 1000);


// =====================

// let expiration
// let ref_block_num
// let chainId
// eos.getInfo({})
//   .then(info => {
//     let chainId = info.chain_id
//     let chainDate = new Date(info.head_block_time + 'Z')
//     let expireInSeconds = 60 // 60s
//     expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);

//     // // Back-up 3 blocks to help avoid mini-forks.
//     // // todo: dawn3 ((head_blocknum/0xffff)*0xffff) + head_blocknum%0xffff
//     ref_block_num = info.head_block_num - 3 & 0xFFFF;
//     let blockNumber = info.head_block_num - 3

//     return eos.getBlock(blockNumber)
//   })
//   .then(block => {

//     var txObject = {
//       "expiration": expiration.toISOString().split('.')[0],
//       "ref_block_num": ref_block_num,
//       "ref_block_prefix": block.ref_block_prefix,
//       "net_usage_words": 0,
//       "max_cpu_usage_ms": 0,
//       "delay_sec": 0,
//       "context_free_actions": [],
//       "actions": [
//         {
//           "account": "eosio.token",
//           "name": "transfer",
//           "authorization": [{ "actor": "data.from", "permission": "active" }],
//           "data": "data"
//         }
//       ],
//       "transaction_extensions": []
//     };

//     var buf = Fcbuffer.toBuffer(eos.fc.structs.transaction, txObject);
//     // var tr = Fcbuffer.fromBuffer(structs.transaction, buf);
//     // var chainIdBuf = new Buffer(chainId, 'hex');
//     // var signBuf = Buffer.concat([chainIdBuf, buf, new Buffer(new Uint8Array(32))]);
//     // var mytransaction = {
//     //   compression: 'none',
//     //   transaction: tr,
//     //   signatures: [],
//     //   unsigned_rawtx: ""
//     // }
//     // mytransaction.unsigned_rawtx = signBuf;

//     // console.log('======================')
//     // console.log(mytransaction)
//     // return cb(null, mytransaction);
//   })
