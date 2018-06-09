import { connect } from 'react-redux'
import { axios } from 'axios'
import BorrowForm from '../components/MoneyBackForm'
import { BASE_URL } from '../../../../common/config'
import { postBorrow } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  postBorrow: async () => {
    try {
      const getTransactionUrl = `${BASE_URL}/user-borrow-get-transaction`
      const getBroadcashUrl = `${BASE_URL}/user-borrow-broadcash`

      const transaction = await axios({
        method: 'POST',
        url: getTransactionUrl,
        data: {
          amount: 10000,
          start: 1528553367201,
          end: 1528553367201,
          memo: '',
          from: 'user-account'
        }
      })
      // ecc.sign(transaction.rawtx)
      const sign = await axios({
        method: 'POST',
        url: getBroadcashUrl,
        data: transaction
      })
      return true
    } catch (e) {
      console.warn('ERR getTokenStatus: ', e)
    }
  }
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BorrowForm)
