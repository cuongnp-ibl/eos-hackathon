import React, { Component } from 'react'
import moment from 'moment'
import { Button } from 'reactstrap'
import { BORROW_STATUS_COLOR } from '../../../../common/config'

const borrowHistoryItem = ({item, index, verifyBorrow}) => (
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
          account: <strong style={{ fontSize: 15, color: 'rgb(51, 51, 51)' }}>{item.borrower}</strong>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: '#D4D4D4' }}>
          amount: <strong style={{ fontSize: 15, color: 'rgb(51, 51, 51)' }}>{Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(item.quantity)}</strong>
        </div>
      </div>
    </div>
    <div style={{ width: 70 }}>
      <Button color='success' onClick={() => verifyBorrow(item.id)}>Verify</Button>
    </div>
  </div>
)

class DonationHistory extends Component {
  componentDidMount () {
    const { getBorrowHistory } = this.props

    getBorrowHistory()
  }

  render () {
    const {
      borrowHistory,
      verifyBorrow
    } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <div style={{ }}>
            <ul style={{ padding: 0 }}>
              {borrowHistory.map((item, index) => borrowHistoryItem({ item, index, verifyBorrow }))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DonationHistory
