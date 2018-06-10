import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div className='inf-section' style={{ }}>
        <h2 style={{
          borderBottomWidth: 1,
          borderBottomColor: '#D4D4D4',
          borderBottomStyle: 'solid'
        }}>{this.props.title}</h2>
      </div>
    )
  }
}

export default App
