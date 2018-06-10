# =============================================================================
# Scenario

# clear table
cleos push action $SC_NAME cleartable '["all"]' -p $SC_NAME

# Regis KYC
cleos push action $SC_NAME addwhitelist '["a.borrower"]' -p pen
cleos push action $SC_NAME addwhitelist '["b.borrower"]' -p pen

# check KYC
cleos get table $SC_NAME $SC_NAME whitelist

# Issue token from issue
cleos push action $SC_NAME issue '["a.donor", 1000]' -p $SC_NAME

# Check issue table
cleos get table $SC_NAME $SC_NAME issue
cleos get table $SC_NAME $SC_NAME summary

# Request borrow
cleos push action $SC_NAME reqloan '["a.borrower", 20]' -p a.borrower

# Check loan request table
cleos get table $SC_NAME $SC_NAME loanreq
cleos get table $SC_NAME $SC_NAME loan

# Approve loan request
cleos push action $SC_NAME apprloan '[0]' -p pen

# Check loan request table
cleos get table $SC_NAME $SC_NAME loanreq
cleos get table $SC_NAME $SC_NAME loan
cleos get table $SC_NAME $SC_NAME summary

# Request payback 
# cleos push action $SC_NAME reqpayback '[1, 19]' -p a.borrower
cleos push action $SC_NAME reqpayback '[0, 21]' -p a.borrower

# Check payback request table
cleos get table $SC_NAME $SC_NAME paybackreq

# Approge payback
cleos push action $SC_NAME apprpayback '[0]' -p pen

# Check payback request table
cleos get table $SC_NAME $SC_NAME paybackreq
cleos get table $SC_NAME $SC_NAME summary

cleos transfer a.borrower pen '100 EOS' 'test 3'