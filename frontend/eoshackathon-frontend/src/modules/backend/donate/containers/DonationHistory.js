import { connect } from 'react-redux'
import axios from 'axios'
import DonationHistory from '../components/DonationHistory'
import { MODULE_NAME } from '../model'
import { BASE_URL } from '../../../../common/config'
import { getDonationHistory } from '../actions'

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
      console.warn('response issueDonation: ', JSON.stringify(response))
      if (response && response.data) {
        return true
      }
      return false
    } catch (e) {
      console.warn('ERR issueDonation: ', e)
    }
  }
})

const mapStateToProps = state => ({
  donateHistory: state[MODULE_NAME].donateHistory
})

export default connect(mapStateToProps, mapDispatchToProps)(DonationHistory)
