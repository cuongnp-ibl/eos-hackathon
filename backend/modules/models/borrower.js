const mongoose = require('mongoose')

const BorrowerSchema = new mongoose.Schema({
  email: String,
  eosAccountName: String
})

module.exports = mongoose.model('Borrower', BorrowerSchema)
