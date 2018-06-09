import React, { Component } from 'react'
import AdminEndTemplate from '../backendTemplate'
import Title from '../../common/elements/Title'
import DonationInfo from '../../modules/backend/donate/containers/DonationInfo'
import DonationHistory from '../../modules/backend/donate/containers/DonationHistory'

class App extends Component {
  render () {
    return (
      <AdminEndTemplate>
        <Title title='Donation Management' />
        <DonationInfo />
        <DonationHistory />
      </AdminEndTemplate>
    )
  }
}

export default App
