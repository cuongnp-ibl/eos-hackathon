import React, { Component } from 'react'
import AdminHeader from '../common/elements/AdminHeader'

class App extends Component {
  render () {
    return (
      <div>
        <AdminHeader />
        <div className='container-fluid'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
