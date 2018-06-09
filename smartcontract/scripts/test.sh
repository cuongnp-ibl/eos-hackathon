SC_NAME=donation

# add whitelist
cleos push action $SC_NAME addwhitelist '["inita"]' -p $SC_NAME
cleos push action $SC_NAME addwhitelist '["initb"]' -p $SC_NAME
cleos push action $SC_NAME addwhitelist '["initc"]' -p $SC_NAME

cleos push action $SC_NAME delwhitelist '["inita"]' -p $SC_NAME

# get table
cleos get table $SC_NAME $SC_NAME whitelist
cleos get table $SC_NAME $SC_NAME blacklist

# issue
cleos push action $SC_NAME issue '["inita", 10]' -p $SC_NAME
cleos push action $SC_NAME issue '["initb", 15]' -p $SC_NAME
cleos push action $SC_NAME issue '["initc", 20]' -p $SC_NAME

# get table
cleos get table $SC_NAME $SC_NAME issue

# clear table
cleos push action $SC_NAME cleartable '["all"]' -p $SC_NAME

# get table
cleos get table $SC_NAME $SC_NAME whitelist
cleos get table $SC_NAME $SC_NAME blacklist
cleos get table $SC_NAME $SC_NAME summary
cleos get table $SC_NAME $SC_NAME loanreq
cleos get table $SC_NAME $SC_NAME loan
cleos get table $SC_NAME $SC_NAME issue
cleos get table $SC_NAME $SC_NAME paybackreq

# Web API RPC

# curl http://127.0.0.1:8888/v1/history/get_key_accounts -X POST -d '{"public_key":"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"}'
# curl http://127.0.0.1:8888/v1/history/get_transactions -X POST -d '{"account_name":"inita"}'
# curl http://127.0.0.1:8888/v1/chain/get_table_rows -X POST -d '{"scope":"donation", "code":"donation", "table":"whitelist", "json": true, "lower_bound":0, "upper_bound":-1, "limit":10}'

cleos push action $SC_NAME addwhitelist '["a.borrower"]' -p pen
cleos push action $SC_NAME addwhitelist '["b.borrower"]' -p pen

cleos push action $SC_NAME reqloan '["a.borrower", 100]' -p a.borrower

cleos get table $SC_NAME $SC_NAME loanreq

cleos push action $SC_NAME denyloan '[1]' -p pen

cleos push action $SC_NAME apprloan '[2]' -p pen

cleos get table $SC_NAME $SC_NAME loan

# Get history
cleos get actions pen

# curl  http://127.0.0.1:8888/v1/chain/abi_bin_to_json -X POST -d '{"code":"currency", "action":"transfer", "binargs":"000000008093dd74000000000094dd74e803000000000000"}'

curl  http://127.0.0.1:8888/v1/history/get_actions -X POST -d '{"account_name":"pen"}'


# Request payback
cleos push action $SC_NAME reqpayback '[2]' -p a.borrower

# Deny payback
cleos push action $SC_NAME denypayback '[2]' -p pen

