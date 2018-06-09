#include "pen.hpp"

const uint64_t ID_SUMMARY = 1;
const uint8_t TYPE_DONATE = 1;
const uint8_t TYPE_PAYBACK = 2;
const uint8_t TYPE_INTEREST = 3;
const uint8_t TYPE_LOAN = 4;
const uint8_t TYPE_LOAN_MINUS = 5;
const uint8_t TYPE_REMAIN = 6;

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
void pen::issue(account_name from, uint64_t quantity) {
  auto itr_from = _tb_issue.find(from);

  if (itr_from == _tb_issue.end()) {
    // Not exist in db
    _tb_issue.emplace(_self, [&](auto &row) {
      row.donor = from;
      row.quantity = quantity;
    });
  } else {
    // Exist in db
    _tb_issue.modify(itr_from, 0, [&](auto &row) { row.quantity += quantity; });
  }

  // Update summary
  update_summary(TYPE_DONATE, quantity);
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
  eosio_assert(itr_req != _tb_loan_req.end(), "Loan request has not exist");

  // Store to loan table
  _tb_loan.emplace(_self, [&](auto &row) {
    row.id = itr_req->id;
    row.borrower = itr_req->borrower;
    row.quantity = itr_req->quantity;
  });

  // Update summary
  update_summary(TYPE_LOAN, itr_req->quantity);

  // Remove loan request
  _tb_loan_req.erase(itr_req);
}

// Operator deny loan request
void pen::denyloan(uint64_t req_id) {
  require_auth(_self);

  auto itr = _tb_loan_req.find(req_id);
  eosio_assert(itr != _tb_loan_req.end(), "Loan request has not exist");

  // Remove loan request
  _tb_loan_req.erase(itr);
}

// Borrower request payback
void pen::reqpayback(uint64_t req_id, uint32_t quantity) {
  auto itr = _tb_loan.find(req_id);
  eosio_assert(itr != _tb_loan.end(), "Loan has not exist");

  eosio_assert(itr->quantity < quantity, "Payback quantity must be larger than loan quantity");

  require_auth(itr->borrower);

  // Insert payback request
  _tb_payback_req.emplace(_self, [&](auto &row) {
    row.id = itr->id;
    row.borrower = itr->borrower;
    row.quantity = quantity;
  });
}

// Operator approve payback from borrower
void pen::apprpayback(uint64_t req_id) {
  require_auth(_self);

  auto itr_req = _tb_payback_req.find(req_id);
  eosio_assert(itr_req != _tb_payback_req.end(),
               "Payback request has not exist");

  uint32_t interest = itr_req->quantity;
  // Update summary
  update_summary(TYPE_PAYBACK, itr_req->quantity);

  // Remove payback request
  _tb_payback_req.erase(itr_req);

  auto itr_req_loan = _tb_loan.find(req_id);
  eosio_assert(itr_req_loan != _tb_loan.end(), "Loan has not exist");

  // Update summary
  update_summary(TYPE_LOAN_MINUS, itr_req_loan->quantity);

  interest -= itr_req_loan->quantity;

  // Remove loan request
  _tb_loan.erase(itr_req_loan);

  // Update summary
  update_summary(TYPE_INTEREST, interest);
}

// Operator deny payback from borrower
void pen::denypayback(uint64_t req_id) {
  require_auth(_self);

  auto itr = _tb_payback_req.find(req_id);
  eosio_assert(itr != _tb_payback_req.end(), "Payback request has not exist");

  // Remove loan request
  _tb_payback_req.erase(itr);
}

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

  auto itr3 = _tb_issue.begin();
  while (itr3 != _tb_issue.end()) {
    _tb_issue.erase(itr3);
    itr3 = _tb_issue.begin();
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

  auto itr6 = _tb_loan.begin();
  while (itr6 != _tb_loan.end()) {
    _tb_loan.erase(itr6);
    itr6 = _tb_loan.begin();
  }

  auto itr7 = _tb_payback_req.begin();
  while (itr7 != _tb_payback_req.end()) {
    _tb_payback_req.erase(itr7);
    itr7 = _tb_payback_req.begin();
  }
}

void pen::require_whitelist(account_name name) {
  auto itr = _tb_whitelist.find(name);
  eosio_assert(itr != _tb_whitelist.end(),
               "Account has not exists in whitelist");
}

void pen::update_summary(uint8_t type, uint32_t quantity) {
  auto itr = _tb_summary.find(ID_SUMMARY);

  summary_rec newValue = {newValue.id = ID_SUMMARY, newValue.donate = 0,
                          newValue.payback = 0,     newValue.interest = 0,
                          newValue.loan = 0,        newValue.remain = 0};
  
  switch(type) {
    case TYPE_DONATE:
      newValue.donate += quantity;
      break;
    case TYPE_PAYBACK:
      newValue.payback += quantity;
      break;
    case TYPE_INTEREST:
      newValue.interest += quantity;
      break;
    case TYPE_LOAN:
      newValue.loan += quantity;
      break;
    case TYPE_LOAN_MINUS:
      newValue.loan -= quantity;
      break;
    case TYPE_REMAIN:
      newValue.remain += quantity;
      break;
  }

  if (itr == _tb_summary.end()) {
    _tb_summary.emplace(_self, [&](auto &row) {
      row.id = newValue.id;
      row.donate = newValue.donate;
      row.payback = newValue.payback;
      row.interest = newValue.interest;
      row.loan = newValue.loan;
      row.remain = newValue.remain;
    });
  } else {
    _tb_summary.modify(itr, 0, [&](auto &row) {
      row.id = newValue.id;
      row.donate += newValue.donate;
      row.payback += newValue.payback;
      row.interest += newValue.interest;
      row.loan += newValue.loan;
      row.remain += newValue.remain;
    });
  }
}