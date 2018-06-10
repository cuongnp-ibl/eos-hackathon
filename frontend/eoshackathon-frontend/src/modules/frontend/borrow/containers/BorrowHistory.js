import { connect } from 'react-redux'
import { axios } from 'axios'
import BorrowHistory from '../components/BorrowHistory'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME } from '../model'
import { MODULE_NAME as USER_MODULE_NAME } from '../../login/model'
import { getBorrowHistory } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getBorrowHistory: async (userId) => {
    try {
      const url = `${BASE_URL}/borrow-history/${userId}`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getBorrowHistory(response.data))
      }
      return true
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  }
})

const mapStateToProps = state => ({
  borrowHistory: state[MODULE_NAME].borrowHistory,
  userId: state[USER_MODULE_NAME].user.userId
})

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistory)
