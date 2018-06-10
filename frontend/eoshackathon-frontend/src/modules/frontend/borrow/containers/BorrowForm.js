import { connect } from 'react-redux'
import axios from 'axios'
import ecc from 'eosjs-ecc'
import BorrowForm from '../components/BorrowForm'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME as USER_LOGIN_MODULE_NAME } from '../../login/model'

const mapDispatchToProps = (dispatch, props) => ({
  postBorrow: async (data, user) => {
    try {
      const getTransactionUrl = `${BASE_URL}/request-borrow`
      const getBroadcashUrl = `${BASE_URL}/send`

      const transaction = await axios({
        method: 'POST',
        url: getTransactionUrl,
        data: {
          quantity: parseInt(data.amount),
          name: user.eosAccountName
        }
      })
      const signed = ecc.sign(Buffer.from(transaction.data.data.unsigned_rawtx.data), data.privateKey)
      let signedRaw = transaction.data.data
      signedRaw.signatures.push(signed)
      delete signedRaw.unsigned_rawtx

      console.warn('signedRaw: ', JSON.stringify(signedRaw))
      const sign = await axios({
        method: 'POST',
        url: getBroadcashUrl,
        data: { rawtx: JSON.stringify(signedRaw) }
      })
      console.warn('sign response: ', JSON.stringify(sign))
      if (!sign) {
        return false
      }
      return true
    } catch (e) {
      console.warn('ERR getTokenStatus: ', e)
    }
  }
})

const mapStateToProps = state => ({
  user: state[USER_LOGIN_MODULE_NAME].user
})

export default connect(mapStateToProps, mapDispatchToProps)(BorrowForm)
