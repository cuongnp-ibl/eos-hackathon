import { connect } from 'react-redux'
import DonationHistory from '../components/DonationHistory'
import { MODULE_NAME } from '../model'

const mapDispatchToProps = (dispatch, props) => ({})

const mapStateToProps = state => ({
  donateHistory: state[MODULE_NAME].donateHistory
})

export default connect(mapStateToProps, mapDispatchToProps)(DonationHistory)
