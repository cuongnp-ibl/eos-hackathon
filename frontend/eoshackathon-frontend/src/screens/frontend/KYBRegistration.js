import React, { Component } from 'react'
import KYBRegistrationForm from '../../modules/frontend/kybRegister/containers/KYBRegistrationForm'
import Title from '../../common/elements/Title'
import FrontEndTemplate from '../frontendTemplate'

class KYBRegistration extends Component {
  render () {
    return (
      <FrontEndTemplate>
        <Title title='KYB Registration' />
        <KYBRegistrationForm />
      </FrontEndTemplate>
    )
  }
}

export default KYBRegistration
