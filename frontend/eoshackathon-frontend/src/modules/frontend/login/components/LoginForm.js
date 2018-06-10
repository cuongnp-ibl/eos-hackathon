import React, { Component } from 'react'

class Charts extends Component {
  render () {
    return (
      <div className='row'>
        <div className='inf-section col-md-12'>
          <form>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Password</label>
              <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter password' />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Charts
