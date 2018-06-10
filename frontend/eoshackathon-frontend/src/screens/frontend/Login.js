import React, { Component } from 'react'
import LoginForm from '../../modules/frontend/login/containers/LoginForm'
import Title from '../../common/elements/Title'
import FrontEndTemplate from '../frontendTemplate'

class KYBRegistration extends Component {
  render () {
    return (
      <FrontEndTemplate>
        <Title title='Login' />
        <LoginForm />
      </FrontEndTemplate>
    )
  }
}

export default KYBRegistration
