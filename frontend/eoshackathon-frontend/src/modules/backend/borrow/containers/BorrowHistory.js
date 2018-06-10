import { connect } from 'react-redux'
import { axios } from 'axios'
import BorrowHistory from '../components/BorrowHistory'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME } from '../model'
import { getBorrowHistory } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getBorrowHistory: async (userId) => {
    try {
      const url = `${BASE_URL}/borrow-history`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getBorrowHistory(response.data))
      }
      return true
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  },
  verifyBorrow: async (id) => {
    try {
      const url = `${BASE_URL}/admin-verify-borrow`
      const response = await axios({
        method: 'POST',
        url,
        data: {
          id: id
        }
      })
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
