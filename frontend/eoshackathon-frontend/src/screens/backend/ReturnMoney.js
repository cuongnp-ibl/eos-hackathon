import React, { Component } from 'react'
import ReturnMoneyHistory from '../../modules/backend/returnMoney/containers/ReturnMoneyHistory'
import Title from '../../common/elements/Title'
import AdminEndTemplate from '../backendTemplate'

class Borrow extends Component {
  render () {
    return (
      <AdminEndTemplate>
        <Title title='Borrow Management' />
        <ReturnMoneyHistory />
      </AdminEndTemplate>
    )
  }
}

export default Borrow
