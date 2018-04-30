import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class TopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  render () {
    return (
<nav>
				<div className="navWide">
					<div className="wideDiv">
					</div>
				</div>
				<div className="navNarrow">
					<i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
					<div className="narrowLinks">
					</div>
				</div>
			</nav>
    );
  }
}

export default TopBar;