import React, { Component } from 'react'

class BorrowForm extends Component {
  render () {
    return (
      <div className='row'>
        <div className='inf-section col-md-12'>
          <form>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Money</label>
                  <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter Amount' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Select Package</label>
                  <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter Last Name' />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label for='exampleInputPassword1'>Private Key</label>
              <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Enter PrivateKey' />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default BorrowForm
