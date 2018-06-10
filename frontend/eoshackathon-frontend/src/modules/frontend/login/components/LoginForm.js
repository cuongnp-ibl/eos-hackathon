import React, { Component } from 'react'
import { Form, Text } from 'react-form'

class LoginForm extends Component {
  goToBorrowPage = () => {
    const { history } = this.props
    history.push('/user/borrow')
  }
  render () {
    const { login } = this.props

    return (
      <div className='row'>
        <div className='inf-section col-md-12'>
          <Form onSubmit={submittedValues => login(submittedValues.email, this.goToBorrowPage)}>
            {formApi => (
              <form onSubmit={formApi.submitForm} id='login'>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email address</label>
                  <Text type='email' className='form-control' field='email' id='email' />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Password</label>
                  <Text type='password' className='form-control' field='password' id='password' />
                </div>
                <button type='submit' className='mb-4 btn btn-primary'>
                  Login
                </button>
              </form>
            )}
          </Form>
        </div>
      </div>
    )
  }
}

export default LoginForm
