const Request    = require("request");
const Eosjs_api  = require('eosjs-api');
const Fcbuffer   = require('fcbuffer');
const Structs    = require('../node_modules/eosjs/lib/structs');
const AssetCache = require('../node_modules/eosjs/lib/asset-cache');
const AbiCache   = require('../node_modules/eosjs/lib/abi-cache');
const config     = require('modules/config')

const json = {
  api: Eosjs_api.api,
  schema: Eosjs_api.schema
};

class RawService {
  constructor() {
    var self = this;
    self.rpcUrl = config.rpcUrl
    self.configDefaults = {
      broadcast: false,
      debug: false,
      sign: false,
      httpEndpoint: self.rpcUrl.split('/v1')[0]
    };
    var Network = Eosjs_api.Localnet;
    Network.schema = json.schema;
    self.config = {};
    self.config = Object.assign({}, self.configDefaults, self.config);
    self.network = Network(Object.assign({}, {
      apiLog: self.consoleObjCallbackLog(self.config.verbose)
    }, self.config));
    var eosConfig = Object.assign({}, {
      transactionLog: self.consoleObjCallbackLog(self.config.verbose)
    }, self.config);

    self.config = Object.assign({}, eosConfig, { network: self.network });
    self.config.assetCache = AssetCache(self.network);
    self.config.abiCache = AbiCache(self.network, self.config);
    self.config.abiCache.abiAsync("pen");

    var chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    self.config.chainId = chainId ? chainId : '00'.repeat(32);
    self.expireTime = 300 // 60s
  }

  createTx(data, cb) {
    var self = this;
    Request(self.rpcUrl + '/chain/get_info', (error, response, info) => {
      if (error) {
        console.log('ERROR ================')
        return cb(error, null);
      }
      else {
        info = JSON.parse(info);
        var chainDate = new Date(info.head_block_time + 'Z');
        var expireInSeconds = self.expireTime;
        // Back-up 3 blocks to help avoid mini-forks.
        // todo: dawn3 ((head_blocknum/0xffff)*0xffff) + head_blocknum%0xffff
        var ref_block_num = info.head_block_num - 3 & 0xFFFF;
        var params = { "block_num_or_id": info.head_block_num - 3 };
        Request.post({
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: self.rpcUrl + "/chain/get_block",
          body: JSON.stringify(params)
        }, (error, response, block) => {
          if (error) {
            return cb(error, null);
          }
          else {
            try {
              if (response.statusCode != 200) {
                return cb(block, null)
              }
              block = JSON.parse(block);
              var expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);
              var txObject = {
                "expiration": expiration.toISOString().split('.')[0],
                "ref_block_num": ref_block_num,
                "ref_block_prefix": block.ref_block_prefix,
                "net_usage_words": 0,
                "max_cpu_usage_ms": 0,
                "delay_sec": 0,
                "context_free_actions": [],
                "actions": [],
                "transaction_extensions": []
              };

              txObject.actions.push(
                {
                  "account": "pen",
                  "name": "issue",
                  "authorization": [{ "actor": "pen", "permission": "active" }],
                  "data": { from: "pen", quantity: 1}
                }
              )

              var _Structs = Structs(self.config);
              var structs = _Structs.structs;
              var buf = Fcbuffer.toBuffer(structs.transaction, txObject);
              var tr = Fcbuffer.fromBuffer(structs.transaction, buf);
              var chainIdBuf = new Buffer(self.config.chainId, 'hex');
              var signBuf = Buffer.concat([chainIdBuf, buf, new Buffer(new Uint8Array(32))]);
              var mytransaction = {
                compression: 'none',
                transaction: tr,
                signatures: [],
                unsigned_rawtx: ""
              }
              mytransaction.unsigned_rawtx = signBuf;
              return cb(null, mytransaction);
            } catch (error) {
              return cb(error.message, null);
            }

          }
        });
      }
    });

  }

  consoleObjCallbackLog() {
    var verbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function (error, result, name) {
      if (error) {
        if (name) {
          console.error(name, 'error');
        }
        console.error(error);
      } else if (verbose) {
        if (name) {
          console.log(name, 'reply:');
        }
        console.log(JSON.stringify(result, null, 4));
      }
    };
  }

}

module.exports = new RawService();
