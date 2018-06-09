import React, { Component } from 'react'

const donationHistoryItem = ({item, index}) => (
  <div className='inf-home-donation-history-item' key={index}>
    <div className='inf-flex'>
      <div style={{ flex: 1, fontSize: 15, color: '#D4D4D4' }}>
        from: <strong style={{ fontSize: 15 }}>{item.from}</strong>
      </div>
      <div style={{ flex: 1, fontSize: 15, color: '#D4D4D4' }}>
        amount: <strong>{item.amount}</strong>
      </div>
    </div>
    <div style={{ fontStyle: 'italic', color: '#D4D4D4' }}>
      {item.note || '...'}
    </div>
  </div>
)

class DonationHistory extends Component {
  render () {
    const {
      donateHistory
    } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <div style={{ }}>
            <h4>Donation History</h4>
            <ul style={{ padding: 0 }}>
              {donateHistory.map((item, index) => donationHistoryItem({ item, index }))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DonationHistory
