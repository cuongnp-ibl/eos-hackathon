import React, { Component } from 'react'
import BorrowForm from '../../modules/frontend/borrow/containers/BorrowForm'
import BorrowHistory from '../../modules/frontend/borrow/containers/BorrowHistory'
import Title from '../../common/elements/Title'
import FrontEndTemplate from '../frontendTemplate'

class App extends Component {
  render () {
    return (
      <FrontEndTemplate>
        <Title title='Borrow Management' />
        <BorrowForm />
        <BorrowHistory />
      </FrontEndTemplate>
    )
  }
}

export default App
