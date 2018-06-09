#include "pen.hpp"

// Add borrower to whitelist KYB
void pen::addwhitelist(account_name borrower, uint8_t score) {
  require_auth(_self);

  auto itr_blacklist = _tb_blacklist.find(borrower);
  eosio_assert(itr_blacklist == _tb_blacklist.end(),
               "Account has been exists in blacklist");

  auto itr_whitelist = _tb_whitelist.find(borrower);
  eosio_assert(itr_whitelist == _tb_whitelist.end(), "Account has been exists");

  // add borrower to whitelist KYB
  _tb_whitelist.emplace(_self, [&](auto &row) {
    row.borrower = borrower;
    row.score = score;
  });
}

// Remove borrower from whitelist KYB
void pen::delwhitelist(account_name borrower) {
  require_auth(_self);

  auto itr = _tb_whitelist.find(borrower);
  eosio_assert(itr != _tb_whitelist.end(), "Account has not exists");

  // add borrower to blacklist KYB
  _tb_blacklist.emplace(_self, [&](auto &row) {
    row.borrower = borrower;
    row.score = itr->score;
  });

  // remove borrower from whitelist
  _tb_whitelist.erase(itr);
}

// issue token from donate
void pen::donate(account_name from, uint64_t quantity) {
  auto itr_from = _tb_donate.find(from);

  if (itr_from == _tb_donate.end()) {
    // Not exist in db
    _tb_donate.emplace(_self, [&](auto &row) {
      row.donor = from;
      row.quantity = quantity;
    });
  } else {
    // Exist in db
    _tb_donate.modify(itr_from, 0,
                      [&](auto &row) { row.quantity += quantity; });
  }
}

// Borrower request to loan money
void pen::reqloan(account_name to, uint64_t quantity) {}
// Operator approve loan request from borrower
void pen::apprloan(uint64_t req_id) {}
// Operator deny loan request
void pen::denyloan(uint64_t req_id) {}
// Borrower request payback
void pen::reqpayback(uint64_t req_id) {}
// Operator approve payback from borrower
void pen::apprpayback(uint64_t req_id) {}
// Operator deny payback from borrower
void pen::denypayback(uint64_t req_id) {}

/**
 * Clear all table. For test only
 */
void pen::cleartable(account_name to) {
  require_auth(_self);

  auto itr1 = _tb_whitelist.begin();
  while (itr1 != _tb_whitelist.end()) {
    _tb_whitelist.erase(itr1);
    itr1 = _tb_whitelist.begin();
  }

  auto itr2 = _tb_blacklist.begin();
  while (itr2 != _tb_blacklist.end()) {
    _tb_blacklist.erase(itr2);
    itr2 = _tb_blacklist.begin();
  }

  auto itr3 = _tb_donate.begin();
  while (itr3 != _tb_donate.end()) {
    _tb_donate.erase(itr3);
    itr3 = _tb_donate.begin();
  }
}