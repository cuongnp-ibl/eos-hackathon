import { connect } from 'react-redux'
import DonationInfo from '../components/DonationInfo'
import { MODULE_NAME } from '../model'

const mapDispatchToProps = (dispatch, props) => ({})

const mapStateToProps = state => ({
  tokenStatus: state[MODULE_NAME].tokenStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(DonationInfo)
