import { connect } from 'react-redux'
import axios from 'axios'
import BorrowHistory from '../components/BorrowHistory'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME } from '../model'
import { getBorrowHistory } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getBorrowHistory: async (userId) => {
    try {
      const url = `${BASE_URL}/admin/loan_req`
      const response = await axios({ url })
      if (response) {
        console.warn('getBorrowHistory', response.data)
        dispatch(getBorrowHistory([...response.data.data]))
      }
      return true
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  },
  verifyBorrow: async (id) => {
    try {
      const url = `${BASE_URL}/admin/approve-request-borrow`
      const response = await axios({
        method: 'POST',
        url,
        data: {
          id
        }
      })
      console.warn('response: ', JSON.stringify(response))
      if (!response) {
        return false
      }
      return true
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  }
})

const mapStateToProps = state => ({
  borrowHistory: state[MODULE_NAME].borrowHistory
})

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistory)
