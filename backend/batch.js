const eos = require('modules/eos');
const config = require('modules/config');
const logger = require('modules/logger');
const mongooseConnection = require('modules/mongoose-connection');
const request = require('request');
const Donation = require('modules/models/donation.js')

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

setInterval(() => {
  fetchAction();
}, 5000);

function fetchAction() {
  var options = {
    method: 'POST',
    url: 'http://127.0.0.1:8888/v1/history/get_actions',
    json: {"account_name":"pen"}
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    if ( body && body.actions ) {
      body.actions.forEach(action => {
        if( action.action_trace.act.account == "eosio.token" && 
          action.action_trace.act.name == "transfer" &&
          action.action_trace.act.data.to == "pen") {

            Donation.findOne({ tx_id: action.action_trace.trx_id }, (err, item) => {
              if( item == null ) {
                var token = action.action_trace.act.data.quantity.split(" ")[0];
                let donation = new Donation({
                  tx_id: action.action_trace.trx_id,
                  from: action.action_trace.act.data.from,
                  to: action.action_trace.act.data.to,
                  quantity: action.action_trace.act.data.quantity,
                  token: token,
                  status: "NEW"
                });

                donation.save(function (err) {
                  if (err) return handleError(err);
                  // saved!
                });
              } 
            });
        }
      });
    }
  });
}