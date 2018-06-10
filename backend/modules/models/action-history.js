const mongoose = require('mongoose')

const ActionHistorySchema = new mongoose.Schema({
  tx_id: String,
  account: String,
  actionName: String,
  data: String,
  blockTime: Date
})

module.exports = mongoose.model('ActionHistory', ActionHistorySchema)
