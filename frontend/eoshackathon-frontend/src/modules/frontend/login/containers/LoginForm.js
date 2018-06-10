import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'
import { BASE_URL } from '../../../../common/config'

const mapDispatchToProps = (dispatch, props) => ({
  login: async (email, goToBorrowPage) => {
    try {
      if (email !== 'bob@pen.com' && email !== 'alice@pen.com') {
        return false
      }
      const url = `${BASE_URL}/login?email=${email}`
      const response = await axios({ url })
      if (response && response.data) {
        console.warn('login response.data: ', JSON.stringify(response.data))
        dispatch(login(response.data))
        goToBorrowPage()
        return true
      }
      return false
    } catch (e) {
      console.warn('ERR getTokenStatus: ', e)
    }
  }
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
