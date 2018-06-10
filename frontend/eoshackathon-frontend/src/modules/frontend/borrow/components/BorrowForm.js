import React, { Component } from 'react'
import { Form, Text, Select } from 'react-form'

const statusOptions = [
  {
    label: '90 days',
    value: '1'
  },
  {
    label: '120 days',
    value: '2'
  },
  {
    label: '180 days',
    value: '3'
  }
]
class BorrowForm extends Component {
  render () {
    const { user, postBorrow } = this.props

    return (
      <div className='row'>
        <div className='inf-section col-md-12'>
          <h4>Borrow</h4>
          <Form onSubmit={submittedValues => postBorrow(submittedValues, user)}>
            {formApi => (
              <form onSubmit={formApi.submitForm} id='userBorrow'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='amount'>Amount</label>
                      <Text field='amount' id='amount' className='form-control' />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='exampleInputEmail1'>Package</label>
                      <Select field='package' id='package' options={statusOptions} className='form-control mb-4' />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='privateKey'>Private Key</label>
                  <Text className='form-control' field='privateKey' id='privateKey' />
                </div>
                <button type='submit' className='mb-4 btn btn-primary'>
                  Submit
                </button>
              </form>
            )}
          </Form>
        </div>
      </div>
    )
  }
}

export default BorrowForm
