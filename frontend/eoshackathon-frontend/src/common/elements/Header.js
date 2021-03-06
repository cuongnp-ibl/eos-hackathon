import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div className='inf-header-container'>
        <Navbar color='' expand='md' className='inf-header-row'>
          <NavbarBrand href='/'>
            <span style={{ fontWeight: 'bold' }}>PEN</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/kyb-registration'>KYB Registration</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/about'>About us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/login'>Login</NavLink>
              </NavItem>
              {/*
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default App
