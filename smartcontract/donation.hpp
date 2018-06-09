#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>

using namespace eosio;
using namespace std;

class donation : public contract {
  // using contract::contract;

public:
  donation(account_name self)
      : contract(self), _tb_donate(_self, _self), _tb_whitelist(_self, _self),
        _tb_blacklist(_self, _self) {}

  // @abi action
  void addwhitelist(account_name borrower, uint8_t score);
  // @abi action
  void delwhitelist(account_name borrower);
  // @abi action
  void donate(account_name from, uint64_t quantity);
  // @abi action
  void lend(account_name to, uint64_t quantity);

private:
  //@abi table donate
  struct donate_rec {
    uint64_t id;
    account_name issuer;
    uint32_t quantity;

    auto primary_key() const { return id; }
    account_name get_issuer() const { return issuer; }
    EOSLIB_SERIALIZE(donate_rec, (id)(issuer)(quantity))
  };
  typedef multi_index<
      N(donate), donate_rec,
      indexed_by<N(by_issuer), const_mem_fun<donate_rec, account_name,
                                             &donate_rec::get_issuer>>>
      donate_table;

  //@abi table whitelist
  struct whitelist_rec {
    account_name borrower;
    uint8_t score;

    auto primary_key() const { return borrower; }

    EOSLIB_SERIALIZE(whitelist_rec, (borrower)(score))
  };

  typedef multi_index<N(whitelist), whitelist_rec> whitelist_table;

  //@abi table blacklist
  struct blacklist_rec {
    account_name borrower;
    uint8_t score;

    auto primary_key() const { return borrower; }

    EOSLIB_SERIALIZE(blacklist_rec, (borrower)(score))
  };

  typedef multi_index<N(blacklist), blacklist_rec> blacklist_table;

  donate_table _tb_donate;
  whitelist_table _tb_whitelist;
  blacklist_table _tb_blacklist;
};

EOSIO_ABI(donation, (addwhitelist)(delwhitelist)(donate)(lend))