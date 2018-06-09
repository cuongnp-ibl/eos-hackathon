#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>

using namespace eosio;
using namespace std;

class donation : public contract {

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
  void requestbor(account_name to, uint64_t quantity);
  // @abi action
  void approvebor(uint64_t req_id);
  // @abi action
  void cleartable(account_name to);

private:
  //@abi table donate
  struct donate_rec {
    account_name donor;
    uint32_t quantity;

    auto primary_key() const { return donor; }
    EOSLIB_SERIALIZE(donate_rec, (donor)(quantity))
  };

  typedef multi_index<N(donate), donate_rec> donate_table;

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

EOSIO_ABI(donation, (addwhitelist)(delwhitelist)(donate)(requestbor)(approvebor)(cleartable))