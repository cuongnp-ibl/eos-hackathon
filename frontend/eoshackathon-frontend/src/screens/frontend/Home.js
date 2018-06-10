import React, { Component } from 'react'
import FrontEndTemplate from '../frontendTemplate'
import Charts from '../../modules/frontend/home/containers/Charts'
import Donations from '../../modules/frontend/home/containers/Donations'
import DonationHistory from '../../modules/frontend/home/containers/DonationHistory'

class App extends Component {
  render () {
    return (
      <FrontEndTemplate>
        <Charts />
        <Donations />
        <DonationHistory />
      </FrontEndTemplate>
    )
  }
}

export default App
