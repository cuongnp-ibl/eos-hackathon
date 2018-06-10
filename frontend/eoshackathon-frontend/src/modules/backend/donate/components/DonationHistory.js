import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { DONATION_STATUS } from '../../../../common/config'

const donationHistoryItem = ({item, index, issueDonation}) => (
  <div className='inf-home-donation-history-item' key={index}>
    <div className='inf-flex'>
      <div style={{ flex: 1, fontSize: 15, color: '#D4D4D4' }}>
        from: <strong style={{ fontSize: 15 }}>{item.from}</strong>
      </div>
      <div style={{ flex: 1, fontSize: 15, color: '#D4D4D4' }}>
        amount: <strong>{item.quantity}</strong>
      </div>
    </div>
    <div style={{ fontStyle: 'italic', color: '#D4D4D4' }}>
      tx: {item.tx_id || '...'}
    </div>
    <div style={{ position: 'absolute', top: 10, right: 0 }}>
      {item.status === 'NEW'
        ? <Button onClick={() => issueDonation(item._id)} color='danger'>ISSUE</Button>
        : <span className={`badge badge-pill ${DONATION_STATUS[item.status]}`}>{item.status}</span>
      }
    </div>
  </div>
)

class DonationHistory extends Component {
  componentDidMount () {
    const { getBorrowHistory, getTokenStatus } = this.props
    getBorrowHistory()
    getTokenStatus()
  }

  render () {
    const {
      donateHistory,
      issueDonation
    } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <div style={{ }}>
            <h4>Donation History</h4>
            <ul style={{ padding: 0 }}>
              {donateHistory.map((item, index) => donationHistoryItem({ item, index, issueDonation }))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DonationHistory
