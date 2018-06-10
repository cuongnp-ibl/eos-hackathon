import React, { Component } from 'react'
import BorrowHistory from '../../modules/backend/borrow/containers/BorrowHistory'
import Title from '../../common/elements/Title'
import AdminEndTemplate from '../backendTemplate'

class Borrow extends Component {
  render () {
    return (
      <AdminEndTemplate>
        <Title title='Borrow Management' />
        <BorrowHistory />
      </AdminEndTemplate>
    )
  }
}

export default Borrow
