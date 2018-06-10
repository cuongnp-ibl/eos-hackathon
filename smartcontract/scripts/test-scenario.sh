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
cleos transfer a.donor pen '110 EOS' 'test 3'
cleos transfer b.donor pen '120 EOS' 'test 3'
cleos transfer b.donor pen '20 EOS' 'test 3'
cleos transfer a.donor pen '30 EOS' 'test 3'
cleos transfer b.donor pen '40 EOS' 'test 3'
cleos transfer a.donor pen '35 EOS' 'test 3'
cleos transfer b.donor pen '25 EOS' 'test 3'
cleos transfer b.donor pen '35 EOS' 'test 3'
cleos transfer a.donor pen '123 EOS' 'test 3'

cleos transfer b.donor pen '80 EOS' 'test 3'

cleos push action eosio.token issue '{"to":"a.donor", "quantity": "5000.0000 EOS", "memo": ""}' -p eosio.token@active
cleos push action eosio.token issue '{"to":"b.donor", "quantity": "5000.0000 EOS", "memo": ""}' -p eosio.token@active


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

# Admin:
# http://localhost:3000/admin/donate-management
# http://localhost:3000/admin/borrow-management

# Frontend:
# http://localhost:3000/
# http://localhost:3000/login
# http://localhost:3000/user/borrow

bob@pen.com