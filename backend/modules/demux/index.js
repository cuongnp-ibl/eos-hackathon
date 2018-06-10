const config = require('modules/config')
const ActionHistory = require('modules/models/action-history')

function getActions() {
  var request = require("request");

  var options = {
    method: 'POST',
    url: `${config.rpcUrl}/history/get_actions`,
    body: { account_name: 'pen' },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    for (let i = 0, len = body.actions.length; i < len; i++) {
      let item = body.actions[i]

      ActionHistory.findOne({tx_id: item.action_trace.trx_id}, (error, result) => {
        if(!result) {
          let actionHistory = new ActionHistory({
            tx_id: item.action_trace.trx_id,
            account: item.action_trace.act.account,
            actionName: item.action_trace.act.name,
            data: JSON.stringify(item.action_trace.act.data),
            blockTime: item.block_time
          })

          actionHistory.save(function (err) {
            if (err) {
              console.log(err)
            } else {

              console.log('SAVE!' + actionHistory)
            }
          });
        }
      })


    }

    setTimeout(() => {
      getActions()
    }, 10000)
  });
}

module.exports.start = () => {
  getActions()
}

