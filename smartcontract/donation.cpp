#include "donation.hpp"

void donation::addwhitelist(account_name borrower, uint8_t score) {
  require_auth( _self );

  auto itr = _tb_whitelist.find(borrower);
  eosio_assert(itr == _tb_whitelist.end(), "Account has been exists");

  // add donor to whitelist KYC
  _tb_whitelist.emplace(_self, [&](auto& row) {
    row.borrower = borrower;
    row.score = score;
  });
}

void donation::delwhitelist(account_name borrower) {
  require_auth( _self );

  auto itr = _tb_whitelist.find(borrower);
  eosio_assert(itr != _tb_whitelist.end(), "Account has not exists");

  // remove borrower from whitelist
  _tb_whitelist.erase(itr);
}

void donation::donate(account_name from, uint64_t quantity) {
  auto by_issuer_index = _tb_donate.get_index<N(by_issuer)>();
  auto itr_from = by_issuer_index.find(from);

  if( itr_from == by_issuer_index.end() ) {
    // Not exist in db
    _tb_donate.emplace(_self, [&](auto& row) {
      row.id = _tb_donate.available_primary_key();
      row.issuer = from;
      row.quantity = quantity;
    });
  } else {
    // Exist in db
    by_issuer_index.modify(itr_from, 0, [&](auto& row) {
      row.quantity += quantity;
    });
  }
}

void donation::lend(account_name to, uint64_t quantity) {}