import { connect } from 'react-redux'
import { axios } from 'axios'
import Charts from '../components/Charts'
import { MODULE_NAME } from '../model'
import { BASE_URL } from '../../../../common/config'
import { getTokenStatus } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  getTokenStatus: async () => {
    try {
      const url = `${BASE_URL}/token-status`
      const response = await axios({ url })
      if (response && response.data) {
        dispatch(getTokenStatus(response.data))
      }
      return true
    } catch (e) {
      console.warn('ERR getTokenStatus: ', e)
    }
  }
})

const mapStateToProps = state => ({
  tokenStatus: state[MODULE_NAME].tokenStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
