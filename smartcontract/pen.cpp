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
void pen::reqloan(account_name borrower, uint64_t quantity) {
  require_auth(borrower);

  // Check whitelist
  require_whitelist(borrower);

  // TODO: check with remain

  // Insert loan request
  _tb_loan_req.emplace(_self, [&](auto &row) {
    row.id = _tb_loan_req.available_primary_key();
    row.borrower = borrower;
    row.quantity = quantity;
  });
}

// Operator approve loan request from borrower
void pen::apprloan(uint64_t req_id) {
  require_auth(_self);

  auto itr_req = _tb_loan_req.find(req_id);
  eosio_assert(itr_req != _tb_loan_req.end(), "Load request has not exist");

  // Store to loan table
  _tb_loan.emplace(_self, [&](auto &row) {
    row.id = itr_req->id;
    row.borrower = itr_req->borrower;
    row.quantity = itr_req->quantity;
  });

  // Remove loan request
  _tb_loan_req.erase(itr_req);
}

// Operator deny loan request
void pen::denyloan(uint64_t req_id) {
  require_auth(_self);

  auto itr = _tb_loan_req.find(req_id);
  eosio_assert(itr != _tb_loan_req.end(), "Load request has not exist");

  // Remove loan request
  _tb_loan_req.erase(itr);
}

// Borrower request payback
void pen::reqpayback(uint64_t req_id) {
  auto itr = _tb_loan.find(req_id);
  eosio_assert(itr != _tb_loan.end(), "Load has not exist");

  require_auth(itr->borrower);

  // Insert payback request
  _tb_payback_req.emplace(_self, [&](auto &row) {
    row.id = itr->id;
    row.borrower = itr->borrower;
    row.quantity = itr->quantity;
  });
}

// Operator approve payback from borrower
void pen::apprpayback(uint64_t req_id) {}

// Operator deny payback from borrower
void pen::denypayback(uint64_t req_id) {}

/**
 * Clear all table. For test only
 */
void pen::cleartable(string type) {
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

  auto itr4 = _tb_summary.begin();
  while (itr4 != _tb_summary.end()) {
    _tb_summary.erase(itr4);
    itr4 = _tb_summary.begin();
  }

  auto itr5 = _tb_loan_req.begin();
  while (itr5 != _tb_loan_req.end()) {
    _tb_loan_req.erase(itr5);
    itr5 = _tb_loan_req.begin();
  }
}

void pen::require_whitelist(account_name name) {
  auto itr = _tb_whitelist.find(name);
  eosio_assert(itr != _tb_whitelist.end(), "Account has not exists in whitelist");
}
