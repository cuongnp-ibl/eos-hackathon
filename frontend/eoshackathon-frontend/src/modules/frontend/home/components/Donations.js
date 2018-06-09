import React, { Component } from 'react'
import QRCode from 'qrcode.react'

class Donations extends Component {
  render () {
    return (
      <div className='row'>
        <div className='inf-section'>
          <div className='inf-home-donation-container'>
            <div style={{
              marginTop: -25,
              backgroundColor: 'white',
              width: 300,
              justifyContent: 'center',
              display: 'flex',
              borderWidth: 1,
              borderColor: '#D4D4D4',
              borderStyle: 'solid',
              height: 40,
              alignItems: 'center'
            }}>
              <h4 style={{ margin: 0 }}>Please Donate Here</h4>
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <div style={{ paddingRight: 10 }}>
                <QRCode value='inf' />
              </div>
              <div style={{ paddingLeft: 10 }}>
                <input value='infxxxx' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Donations
