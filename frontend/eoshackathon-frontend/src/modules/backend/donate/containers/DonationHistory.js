import { connect } from 'react-redux'
import axios from 'axios'
import DonationHistory from '../components/DonationHistory'
import { MODULE_NAME } from '../model'
import { BASE_URL } from '../../../../common/config'
import { getDonationHistory, getTokenStatus } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getBorrowHistory: async (userId) => {
    try {
      const url = `${BASE_URL}/admin/donations`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getDonationHistory([...response.data.data]))
      }
      return true
    } catch (e) {
      console.warn('ERR getBorrowHistory: ', e)
    }
  },
  issueDonation: async (id) => {
    try {
      const url = `${BASE_URL}/admin/issue-token`
      const response = await axios({
        method: 'POST',
        url,
        data: { id }
      })
      if (response && response.data) {
        window.location.reload()
        return true
      }
      return false
    } catch (e) {
      console.warn('ERR issueDonation: ', e)
    }
  },
  getTokenStatus: async () => {
    try {
      const url = `${BASE_URL}/token-status`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getTokenStatus(response.data.data))
      }
      return true
    } catch (e) {
      console.warn('ERR getTokenStatus: ', e)
    }
  }
})

const mapStateToProps = state => ({
  donateHistory: state[MODULE_NAME].donateHistory
})

export default connect(mapStateToProps, mapDispatchToProps)(DonationHistory)
