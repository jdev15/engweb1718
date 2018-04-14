import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class TopMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  closeMenu () {
    this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render () {
    return (
      <div>
        <Menu id="this"
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <img src="https://pbs.twimg.com/profile_images/627865990991380481/3rJJkd9o_400x400.jpg" alt="W3Schools.com" />
          <p>Bem-Vindo José</p>
          <a onClick={() => this.closeMenu()}>Portfolio</a>
          <a onClick={() => this.closeMenu()}>Perfil</a>
          <a onClick={() => this.closeMenu()}>Plafond Atual</a>
          <a onClick={() => this.closeMenu()}>Gerir Plafond</a>
          <a onClick={() => this.closeMenu()}>Gerir Perfil</a>
          <a onClick={() => this.closeMenu()}>Logout</a>
        </Menu>
      </div>
    )
  }
}

export default TopMenu;