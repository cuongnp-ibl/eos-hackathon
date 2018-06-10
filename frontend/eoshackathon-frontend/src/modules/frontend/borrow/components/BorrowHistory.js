import React, { Component } from 'react'
import moment from 'moment'
import { BORROW_STATUS_COLOR } from '../../../../common/config'

const borrowHistoryItem = ({item, index}) => (
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, fontSize: 13, color: '#D4D4D4' }}>
          amount: <strong style={{ fontSize: 15, color: 'rgb(51, 51, 51)' }}>{Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(item.amount)}</strong>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: '#D4D4D4' }}>
          {`from `} <strong style={{ fontSize: 13, color: 'rgb(51, 51, 51)' }}>{moment(item.start).format()}</strong>
          {` to `}<strong style={{ fontSize: 13, color: 'rgb(51, 51, 51)' }}>{moment(item.end).format()}</strong>
        </div>
      </div>
    </div>
    <div style={{ width: 100, display: 'flex', justifyContent: 'flex-end', height: 18 }}>
      <span className={`badge badge-pill ${BORROW_STATUS_COLOR[item.status]}`}>{item.status}</span>
    </div>
  </div>
)

class DonationHistory extends Component {
  render () {
    const {
      borrowHistory
    } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <div style={{ }}>
            <h4>Borrow History</h4>
            <ul style={{ padding: 0 }}>
              {borrowHistory.map((item, index) => borrowHistoryItem({ item, index }))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DonationHistory
