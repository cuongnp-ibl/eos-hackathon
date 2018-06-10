var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
 
autoIncrement.initialize(mongoose.connection);

var donationSchema = new Schema({
  // title:  String,
  // author: String,
  // body:   String,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs:  Number
  // }
  tx_id: String,
  from: String,
  to: String,
  quantity: String,
  token: String,
  // Status: NEW | ISSUED
  status: String
});
donationSchema.plugin(autoIncrement.plugin, 'Donation');
module.exports = mongoose.model('Donation', donationSchema)
