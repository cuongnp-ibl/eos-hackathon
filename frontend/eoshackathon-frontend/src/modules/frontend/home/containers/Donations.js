import { connect } from 'react-redux'
import { axios } from 'axios'
import Donations from '../components/Donations'
import { BASE_URL } from '../../../../common/config'
import { MODULE_NAME } from '../model'
import { getBalance } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getBalance: async (type) => {
    try {
      const address = ''
      const url = `${BASE_URL}/balance/${type}/${address}`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getBalance(response.data))
      }
      return true
    } catch (e) {
      console.warn('ERR getDonationHistoryData: ', e)
    }
  }
})

const mapStateToProps = state => ({
  balance: state[MODULE_NAME].balance
})

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
