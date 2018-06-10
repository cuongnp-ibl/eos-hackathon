
import React, { Component } from 'react'
import MoneyBackForm from '../../modules/frontend/returnMoney/containers/MoneyBackForm'
import BorrowHistory from '../../modules/frontend/borrow/containers/BorrowHistory'
import Title from '../../common/elements/Title'
import FrontEndTemplate from '../frontendTemplate'

class Borrow extends Component {
  render () {
    return (
      <FrontEndTemplate>
        <Title title='Return Money' />
        <MoneyBackForm />
        <BorrowHistory />
      </FrontEndTemplate>
    )
  }
}

export default Borrow
