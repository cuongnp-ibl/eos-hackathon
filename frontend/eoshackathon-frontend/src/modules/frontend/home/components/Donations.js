import React, { Component } from 'react'
import QRCode from 'qrcode.react'

class Donations extends Component {
  render () {
    const { balance } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <div className='row'>
            <div className='col-md-4'>
              <div style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#D3D3D3',
                borderStyle: 'solid',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                backgroundColor: 'white'
              }}>
                <QRCode value='pen.abi' />
                <p style={{ padding: 0, margin: 0 }}>Balance: {balance['eos'].balance}</p>
                <span style={{ border: 'none', backgroundColor: 'white', textAlign: 'center' }}>pen.abi</span>
              </div>
            </div>
            <div className='col-md-4'>
              <div style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#D3D3D3',
                borderStyle: 'solid',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                backgroundColor: 'white'
              }}>
                <QRCode value='0xc06bf762bc60ca9518669897348c6d694e453678' />
                <p style={{ padding: 0, margin: 0 }}>Balance: {balance['eth'].balance}</p>
                <span style={{ border: 'none', backgroundColor: 'white', textAlign: 'center', wordWrap: 'break-out' }}>0xc06bf762bc60ca9...00000</span>
              </div>

            </div>
            <div className='col-md-4'>
              <div style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: '#D3D3D3',
                borderStyle: 'solid',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                backgroundColor: 'white'
              }}>
                <QRCode value='0x1Lf2vaGgLmjyHBH3Yt94Sa4myFMC9bxtDr' />
                <p style={{ padding: 0, margin: 0 }}>Balance: {balance['btc'].balance}</p>
                <span style={{ border: 'none', backgroundColor: 'white', textAlign: 'center' }}>0x1Lf2vaGgLm....4my9bxtDr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Donations
