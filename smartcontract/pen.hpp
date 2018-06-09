#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>

using namespace eosio;
using namespace std;

class pen : public contract {

public:
  pen(account_name self)
      : contract(self), _tb_donate(_self, _self), _tb_whitelist(_self, _self),
        _tb_blacklist(_self, _self), _tb_summary(_self, _self), _tb_loan_req(_self, _self),
        _tb_loan(_self, _self), _tb_payback_req(_self, _self) {}

  // @abi action
  void addwhitelist(account_name borrower, uint8_t score);
  // @abi action
  void delwhitelist(account_name borrower);
  // @abi action
  void donate(account_name from, uint64_t quantity);
  // @abi action
  void reqloan(account_name borrower, uint64_t quantity);
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
  void cleartable(string type);

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

  //@abi table summary
  struct summary_rec {
    uint64_t id;
    uint64_t donate;
    uint64_t payback;
    uint64_t interest;
    uint64_t loan;
    uint64_t remain;

    auto primary_key() const { return id; }

    EOSLIB_SERIALIZE(summary_rec, (id)(donate)(payback)(interest)(loan)(remain))
  };

  typedef multi_index<N(summary), summary_rec> summary_table;

  //@abi table loanreq
  struct loan_req_rec {
    uint64_t  id;
    account_name borrower;
    uint32_t quantity;

    auto primary_key() const { return id; }

    EOSLIB_SERIALIZE(loan_req_rec, (id)(borrower)(quantity))
  };

  typedef multi_index<N(loanreq), loan_req_rec> loan_request_table;

  //@abi table loan
  struct loan_rec {
    uint64_t  id;
    account_name borrower;
    uint32_t quantity;

    auto primary_key() const { return id; }

    EOSLIB_SERIALIZE(loan_rec, (id)(borrower)(quantity))
  };

  typedef multi_index<N(loan), loan_rec> loan_table;

  //@abi table paybackreq
  struct payback_req_rec {
    uint64_t  id;
    account_name borrower;
    uint32_t quantity;

    auto primary_key() const { return id; }

    EOSLIB_SERIALIZE(payback_req_rec, (id)(borrower)(quantity))
  };

  typedef multi_index<N(paybackreq), payback_req_rec> payback_req_table;

  donate_table _tb_donate;
  whitelist_table _tb_whitelist;
  blacklist_table _tb_blacklist;
  summary_table _tb_summary;
  loan_request_table _tb_loan_req;
  loan_table _tb_loan;
  payback_req_table _tb_payback_req;

  void require_whitelist(account_name name);
};

EOSIO_ABI(pen, (addwhitelist)(delwhitelist)(donate)(reqloan)(apprloan)(denyloan)(reqpayback)(apprpayback)(denypayback)(cleartable))