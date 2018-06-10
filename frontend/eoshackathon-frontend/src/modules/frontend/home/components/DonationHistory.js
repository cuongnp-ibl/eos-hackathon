import React, { Component } from 'react'
import moment from 'moment'

const donationHistoryItem = ({item, index}) => (
  <div
    style={{
      display: 'flex',
      borderBottomWidth: 1,
      borderBottomColor: '#D3D3D3',
      borderBottomStyle: 'solid',
      padding: 10,
      backgroundColor: 'white'
    }}
    key={index}
  >
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, fontSize: 13, color: '#D4D4D4' }}>
        from: <strong style={{ fontSize: 15, color: 'rgb(51, 51, 51)' }}>{item.from}</strong>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: '#D4D4D4' }}>
        amount: <strong style={{ fontSize: 15, color: 'rgb(51, 51, 51)' }}>{`${item.amount} ${item.type}`}</strong>
        </div>
      </div>
      <div style={{ fontStyle: 'italic', color: '#D4D4D4' }}>
        {item.memo || '...'} - <span style={{ fontSize: 13 }}>{moment(item.donateDate).format()}</span>
      </div>
    </div>
    <div style={{ width: 70 }}>
      {item.status === 'inreview' ? <span className='badge badge-pill badge-warning'>in-review</span> : <span className='badge badge-pill badge-primary'>success</span>}
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
