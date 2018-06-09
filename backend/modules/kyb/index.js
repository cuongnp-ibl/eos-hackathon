// This is module KYB (know your borrower) to verify borrower.
// Hack to alway be approved for demo

module.exports.verify = (kyb) => {
  return kyb.kybStatus = "APPROVED"
}
