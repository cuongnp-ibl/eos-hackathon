SC_NAME=donation

# add whitelist
cleos push action $SC_NAME addwhitelist '["inita"]' -p $SC_NAME
cleos push action $SC_NAME addwhitelist '["initb"]' -p $SC_NAME
cleos push action $SC_NAME addwhitelist '["initc"]' -p $SC_NAME

cleos push action $SC_NAME delwhitelist '["inita"]' -p $SC_NAME

# get table
cleos get table $SC_NAME $SC_NAME whitelist
cleos get table $SC_NAME $SC_NAME blacklist

# donate
cleos push action $SC_NAME donate '["inita", 10]' -p $SC_NAME
cleos push action $SC_NAME donate '["initb", 15]' -p $SC_NAME
cleos push action $SC_NAME donate '["initc", 20]' -p $SC_NAME

# get table
cleos get table $SC_NAME $SC_NAME donate

# clear table
cleos push action $SC_NAME cleartable '["inita"]' -p $SC_NAME

# Web API RPC

# curl http://127.0.0.1:8888/v1/history/get_key_accounts -X POST -d '{"public_key":"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"}'
# curl http://127.0.0.1:8888/v1/history/get_transactions -X POST -d '{"account_name":"inita"}'
# curl http://127.0.0.1:8888/v1/chain/get_table_rows -X POST -d '{"scope":"donation", "code":"donation", "table":"whitelist", "json": true, "lower_bound":0, "upper_bound":-1, "limit":10}'

