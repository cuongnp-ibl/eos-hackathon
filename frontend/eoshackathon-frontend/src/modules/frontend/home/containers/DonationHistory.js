import { connect } from 'react-redux'
import axios from 'axios'
import DonationHistory from '../components/DonationHistory'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME } from '../model'
import { getDonationHistory } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getDonationHistoryData: async () => {
    try {
      const url = `${BASE_URL}/admin/donations`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getDonationHistory([...response.data.data]))
        return true
      }
      return false
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  }
})

const mapStateToProps = state => ({
  donateHistory: state[MODULE_NAME].donateHistory
})

export default connect(mapStateToProps, mapDispatchToProps)(DonationHistory)
