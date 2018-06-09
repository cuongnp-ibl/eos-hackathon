#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>

using namespace eosio;
using namespace std;

class pen : public contract {

public:
  pen(account_name self)
      : contract(self), _tb_donate(_self, _self), _tb_whitelist(_self, _self),
        _tb_blacklist(_self, _self) {}

  // @abi action
  void addwhitelist(account_name borrower, uint8_t score);
  // @abi action
  void delwhitelist(account_name borrower);
  // @abi action
  void donate(account_name from, uint64_t quantity);
  // @abi action
  void reqloan(account_name to, uint64_t quantity);
  // @abi action
  void apprloan(uint64_t req_id);
  // @abi action
  void denyloan(uint64_t req_id);
  // @abi action
  void reqpayback(uint64_t req_id);
  // @abi action
  void apprpayback(uint64_t req_id);
  // @abi action
  void denypayback(uint64_t req_id);
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

EOSIO_ABI(pen, (addwhitelist)(delwhitelist)(donate)(reqloan)(apprloan)(denyloan)(reqpayback)(apprpayback)(denypayback)(cleartable))