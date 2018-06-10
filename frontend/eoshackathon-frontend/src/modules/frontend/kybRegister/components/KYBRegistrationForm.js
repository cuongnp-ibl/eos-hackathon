import React, { Component } from 'react'

class Charts extends Component {
  render () {
    return (
      <div className='row'>
        <div className='inf-section col-md-12'>
          <form>
            <div className='form-group'>
              <label for='exampleInputEmail1'>Email address</label>
              <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>First Name</label>
                  <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter First Name' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Last Name</label>
                  <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter Last Name' />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label for='exampleInputPassword1'>Password</label>
              <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
            </div>
            <div className='form-group'>
              <label for='exampleInputPassword1'>Confirm Password</label>
              <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
            </div>
            <div className='form-group'>
              <label for='exampleInputFile'>Identify Card</label>
              <input type='file' className='form-control-file' id='exampleInputFile' aria-describedby='fileHelp' />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Charts
