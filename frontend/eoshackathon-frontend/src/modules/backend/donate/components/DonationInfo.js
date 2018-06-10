import React, { Component } from 'react'
import QRCode from 'qrcode.react'

class DonationInfo extends Component {
  render () {
    const { tokenStatus } = this.props

    return (
      <div className='row'>
        <div className='inf-section'>
          <h4>General Infomation</h4>
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
                <p style={{ padding: 0, margin: 0 }}>Balance: 1000 EOS</p>
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
                <p style={{ padding: 0, margin: 0 }}>Balance: 100 ETH</p>
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
                <p style={{ padding: 0, margin: 0 }}>Balance: 100 BTC</p>
                <span style={{ border: 'none', backgroundColor: 'white', textAlign: 'center' }}>0x1Lf2vaGgLm....4my9bxtDr</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div
                style={{
                  borderWidth: 1,
                  borderColor: '#D3D3D3',
                  borderStyle: 'solid',
                  backgroundColor: 'white',
                  borderRadius: 4,
                  marginTop: 20,
                  padding: 10
                }}
              >
                Total lending/Total availabe:  {tokenStatus.currentLending} / {tokenStatus.availabe}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DonationInfo

/*
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#D3D3D3',
              borderStyle: 'solid',
              width: '29%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'white'
            }}>
              <QRCode value='pen.abi' />
              <p style={{ padding: 0, margin: 0 }}>Balance: 1000 EOS</p>
              <span style={{ border: 'none', backgroundColor: 'white', textAlign: 'center' }}
                rows='2'
              >pen.abi</span>
            </div>
            <div style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#D3D3D3',
              borderStyle: 'solid',
              width: '29%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'white'
            }}>
              <QRCode value='0xc06bf762bc60ca9518669897348c6d694e453678' />
              <p style={{ padding: 0, margin: 0 }}>Balance: 100 ETH</p>
              <div>
                <p style={{ border: 'none', backgroundColor: 'white', textAlign: 'center', wordWrap: 'break-out' }}
                  rows='2'
                >0xc06bf762bc60ca9518669897348c6d694e453678</p>
              </div>
            </div>
            <div style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#D3D3D3',
              borderStyle: 'solid',
              width: '29%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'white'
            }}>
              <QRCode value='0x1Lf2vaGgLmjyHBH3Yt94Sa4myFMC9bxtDr' />
              <p style={{ padding: 0, margin: 0 }}>Balance: 100 BTC</p>
              <span
                style={{ border: 'none', backgroundColor: 'white', textAlign: 'center' }}
              >0x1Lf2vaGgLmjyHBH3Yt94Sa4myFMC9bxtDr</span>
            </div>
          </div>
*/
