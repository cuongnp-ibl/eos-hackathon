const express      = require('express')
const cookieParser = require('cookie-parser')
const session      = require('express-session');
const Fcbuffer     = require('fcbuffer')
const request      = require('request')
const cors         = require('cors');

const eos                = require('modules/eos')
const config             = require('modules/config')
const logger             = require('modules/logger')
const mongooseConnection = require('modules/mongoose-connection')
const Donation = require('modules/models/donation.js')
const ActionHistory = require('modules/models/action-history')
const Borrower = require('modules/models/borrower')

const raw = require('modules/rawTransaction');

const app = express()

app.use(express.json({
  limit: '100mb',
  strict: true
}))

app.use(cors())
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
app.use(express.json({
  limit: '100mb',
  strict: true
}))

app.get('/api/login', (req, res) => {
  if (req.query.email) {
    let email = req.query.email
    Borrower.findOne({email: email}, (error, borrower) => {
      if (borrower) {
        req.session.authenticated = true;
        req.session.user = {
          id: borrower._id,
          eosAccountName: borrower.eosAccountName,
          role: ['BRORROWER']
        }
        res.send(borrower)
      } else {
        res.status(401).send()
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


app.post('/api/admin/issue-token', (req, res) => {
  var id = req.body.id;
  Donation.findOne({"_id": id, "status": "NEW"}, (err, item) => {
    console.log('item :', item);
    if( item != null ) {
      var action = {
        "account": "pen",
        "name": "issue",
        "authorization": [{ "actor": "pen", "permission": "active" }],
        "data": { from: item.from, quantity: parseInt(item.token)}
      };
      raw.createTx(action, (err, txRes) => {
        rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", txRes);
        console.log('rawTx :', rawTx);
        raw.sendRawTx(JSON.stringify(rawTx), (err, txRes) => {
          console.log("sendRawTx", err, txRes);
        });
      });

      item.status = "ISSUED";
      item.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    }

    res.send({cd: 0})
  });

})

app.post('/api/send', (req, res) => {
  var rawtx = req.body.rawtx;
  raw.sendRawTx(JSON.stringify(rawTx), (err, txRes) => {
    console.log("sendRawTx", err, txRes);
    res.send({cd: 0, data: txRes});
  });
})

app.post('/api/request-borrow', (req, res) => {
  var acc_name = req.body.name;
  var quantity = req.body.quantity;

  var action = {
    "account": "pen",
    "name": "reqloan",
    "authorization": [{ "actor": acc_name, "permission": "active" }],
    "data": { borrower: acc_name, quantity: parseInt(quantity)}
  };

  raw.createTx(action, (err, txRes) => {
    res.send({data: txRes});
    // rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", txRes);
    // console.log('rawTx :', rawTx);
    // raw.sendRawTx(JSON.stringify(rawTx), (err, txRes) => {
    //   console.log("sendRawTx", err, txRes);
    // });
  });

  // res.send('OK')
});

app.post('/api/admin/approve-request-borrow', (req, res) => {
  var id = req.body.id;

  var action = {
    "account": "pen",
    "name": "apprloan",
    "authorization": [{ "actor": "pen", "permission": "active" }],
    "data": { req_id: parseInt(id)}
  };
  raw.createTx(action, (err, txRes) => {
    rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", txRes);
    console.log('rawTx :', rawTx);
    raw.sendRawTx(JSON.stringify(rawTx), (err, txRes) => {
      console.log("sendRawTx", err, txRes);
    });
  });

  res.send({cd: 0})

})

app.post('/api/sign-borrow-request', (req, res) => {

})

app.get('/api/token-status', (req, res) => {

  var result = {
    "currentLending": 0,
    "availabe": 0,
    "totalDonate": 0,
    "totalPayback": 0
  };

  eos.getTableRows({
    json: "true",
    code: "pen",
    scope: "pen",
    table: "summary"
  }).then((body) => {

    if( body.rows && body.rows.length == 1) {
      var summary = body.rows[0];
      result.currentLending = summary.loan;
      result.totalDonate = summary.donate;
      result.totalPayback = summary.payback;
      result.availabe = summary.donate - summary.loan + summary.payback;
      //   { id: 1,
      //     donate: 1400,
      //     payback: 100,
      //     interest: 50,
      //     loan: 50,
      //     remain: 0,
      //     numreq: 4 }
    }

    res.send({
      data: result
    })

  });

});

app.get('/api/admin/loans', (req, res) => {
  var result = [];
  eos.getTableRows({
    json: "true",
    code: "pen",
    scope: "pen",
    table: "loan"
  }).then((body) => {

    if( body.rows && body.rows.length > 0) {
      result = body.rows;
    }

    res.send({
      data: result
    })

  });
});

app.get('/api/admin/loan_req', (req, res) => {
  var result = [];
  eos.getTableRows({
    json: "true",
    code: "pen",
    scope: "pen",
    table: "loanreq"
  }).then((body) => {

    if( body.rows && body.rows.length > 0) {
      result = body.rows;
    }

    res.send({
      data: result
    })

  });
});

app.get('/api/admin/payback_req', (req, res) => {
  var result = [];
  eos.getTableRows({
    json: "true",
    code: "pen",
    scope: "pen",
    table: "paybackreq"
  }).then((body) => {

    if( body.rows && body.rows.length > 0) {
      result = body.rows;
    }

    res.send({
      data: result
    })

  });
});

app.get('/api/admin/donations', (req, res) => {
  console.log('asdfsadf');
  Donation.find({}, (err, items) => {
    console.log(err, items)
    res.send({
      data: items
    })
  })
});

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

      setTimeout(() => {
        raw.createTx({from: "sontt", quantity: 100}, (err, res) => {
          // console.log(err)
          // console.log('================')
          // console.log(res)
        })
      }, 1000);


      const demux = require('modules/demux')
      demux.start()

      //   rawTx = raw.signTx("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", res);
      //   console.log('rawTx :', rawTx);
      //   raw.sendRawTx(JSON.stringify(rawTx), (err, res) => {
      //     console.log("sendRawTx", err, res);
      //   });

      // })
    })
  });


