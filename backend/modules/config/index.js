const config = {}

config.port = 7000
config.sessionSecret = "sessionSecret"
config.sessionExpire = "18000"
config.mongoUri = "mongodb://127.0.0.1/pendb"

config.rpcUrl = "http://10.101.2.42:8888/v1"

module.exports = config
