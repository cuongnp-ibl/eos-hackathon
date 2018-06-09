# =============================================================================
# Run fullnode
nodeos -e -p eosio \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::history_api_plugin \
  --plugin eosio::wallet_api_plugin \
  --wallet-dir . \
  --signature-provider EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV=KEY:5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3 \
  --http-server-address=0.0.0.0:8888 \
  --filter-on pen:addwhitelist: \
  --filter-on pen:delwhitelist: \
  --filter-on pen:donate: \
  --filter-on pen:reqloan: \
  --filter-on pen:apprloan: \
  --filter-on pen:denyloan: \
  --filter-on pen:reqpayback: \
  --filter-on pen:apprpayback: \
  --filter-on pen:denypayback: \
  --contracts-console 

# =============================================================================
# Deploy smart contract
PASSWORD=PW5Jn7QbGQ4eVz8oYXSxAgQEYG7CPcB4RqNcbA7MK9vk3Gxnb4FGh
PUBKEY=EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
PRIVKEY=5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

SC_PRIVKEY=5K2x48avWZmEvimGYM5Nvuy3qf1nzV6FRvD4R2MkQGZikWcH496
SC_PUBKEY=EOS8FTpF7bbZ4k8qB1XRBu3gAj3Zv9taJPUxZosUvZyPoBMwxy4XT
SC_NAME=pen
SC_PATH=.

## unlock wallet
cleos wallet unlock --password PW5Jn7QbGQ4eVz8oYXSxAgQEYG7CPcB4RqNcbA7MK9vk3Gxnb4FGh

## import smartcontract private key
cleos wallet import $SC_PRIVKEY

## create account
cleos create account eosio $SC_NAME $SC_PUBKEY $SC_PUBKEY

## deploy smartcontract
cleos set contract $SC_NAME $SC_PATH/ $SC_PATH/$SC_NAME.wast $SC_PATH/$SC_NAME.abi -p $SC_NAME

# =============================================================================
# Test smart contract

# pen.ope
# Private key: 5KjE3jXN7gFiMUgkKnw9jaBpE2fo6uMVdzajNssVkfDcmHJCdP2
# Public key: EOS6x1Ct6XpQyXUb3SyNKkWdeebaCEhHAP62BE2k3YyANkuixhh4A

# a.donor
# Private key: 5HqFw824gzeeXGmVrxF1W2jcdhxEYzgRFPp3RLc2rfFwgKpwuqz
# Public key: EOS5oMpgJNyYExLAjzk4goJJ5exSmAxnYQcFaQmbgnVWqMA1PaMGJ

# b.donor
# Private key: 5KNhKD3vaipEckyFjF3QVZvHZb3LbcCMLoWNE8jWvXxTGg6PoDF
# Public key: EOS6w4zLcrLGwQboyoaDYMcBRzRHpZzv69NKtqCb8HrkpoSnPhsNV

# a.borrower
# Private key: 5K39gpQF9ncqcjujQUGUu33L6BVmphAwKtjsqpT5wEaw1TsWkJk
# Public key: EOS5wrNMdhG5WYRrYphdy1r2HSXmqDKq5SiavcQ7pYHfV92E9rSug

# b.borrower
# Private key: 5KTTpF7zY5DK7DrdtgvHY4LJ6D2rExXTbjF2QRGVweCJuBUYuAY
# Public key: EOS4tWnGtCbuTi2YBXpSzeoiTVYG6xMqrJd5LKi336TAH1YvKAnWV

# c.borrower
# Private key: 5JNvVbXB746EJnWHwR1mzq8jc1zRBqvs3QM44C9YekD5kWqgwjy
# Public key: EOS7j3AjAhpga8Q2rJXmwtg6MJ1qZJxEzoZffSc1UZnnk4JP9CgvX

# d.borrower
# Private key: 5KjDTz1ucHJTxWzKyrsGHKVPXFyNzcydePiDMiwrxJpyTR8Byno
# Public key: EOS8jPBfx25kzyFhf9oZu2pNCD5b3kGLVCnhYGb9nhaA1cKDM8n9F

# e.borrower
# Private key: 5JStmnDKy8ZmUMJAGW5jYUh5LSLYHHtgacjvoLEUAGLtGpL3Hkt
# Public key: EOS63ndr7LahwtvTRn3VDXA5kAAFFgs7FS8wVbjBeTjS2opUvFtoZ

# import key
cleos wallet import 5KjE3jXN7gFiMUgkKnw9jaBpE2fo6uMVdzajNssVkfDcmHJCdP2
cleos wallet import 5HqFw824gzeeXGmVrxF1W2jcdhxEYzgRFPp3RLc2rfFwgKpwuqz
cleos wallet import 5KNhKD3vaipEckyFjF3QVZvHZb3LbcCMLoWNE8jWvXxTGg6PoDF
cleos wallet import 5K39gpQF9ncqcjujQUGUu33L6BVmphAwKtjsqpT5wEaw1TsWkJk
cleos wallet import 5KTTpF7zY5DK7DrdtgvHY4LJ6D2rExXTbjF2QRGVweCJuBUYuAY
cleos wallet import 5JNvVbXB746EJnWHwR1mzq8jc1zRBqvs3QM44C9YekD5kWqgwjy
cleos wallet import 5KjDTz1ucHJTxWzKyrsGHKVPXFyNzcydePiDMiwrxJpyTR8Byno
cleos wallet import 5JStmnDKy8ZmUMJAGW5jYUh5LSLYHHtgacjvoLEUAGLtGpL3Hkt

cleos create account eosio pen.ope EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS6x1Ct6XpQyXUb3SyNKkWdeebaCEhHAP62BE2k3YyANkuixhh4A
cleos create account eosio a.donor EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS5oMpgJNyYExLAjzk4goJJ5exSmAxnYQcFaQmbgnVWqMA1PaMGJ
cleos create account eosio b.donor EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS6w4zLcrLGwQboyoaDYMcBRzRHpZzv69NKtqCb8HrkpoSnPhsNV
cleos create account eosio a.borrower EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS5wrNMdhG5WYRrYphdy1r2HSXmqDKq5SiavcQ7pYHfV92E9rSug
cleos create account eosio b.borrower EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS4tWnGtCbuTi2YBXpSzeoiTVYG6xMqrJd5LKi336TAH1YvKAnWV
cleos create account eosio c.borrower EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS7j3AjAhpga8Q2rJXmwtg6MJ1qZJxEzoZffSc1UZnnk4JP9CgvX
cleos create account eosio d.borrower EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS8jPBfx25kzyFhf9oZu2pNCD5b3kGLVCnhYGb9nhaA1cKDM8n9F
cleos create account eosio e.borrower EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS63ndr7LahwtvTRn3VDXA5kAAFFgs7FS8wVbjBeTjS2opUvFtoZ


cleos push action pen addwhitelist '["a.borrower"]' -p pen
cleos push action pen addwhitelist '["b.borrower"]' -p pen

cleos get table pen pen whitelist
cleos get table pen pen blacklist

cleos push action pen delwhitelist '["b.borrower"]' -p pen


