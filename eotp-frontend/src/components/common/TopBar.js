import React from 'react';
import '../../css/topbar.css'
import {Navbar,Nav,NavItem, NavbarToggler, Collapse} from 'reactstrap';
import LogOut from 'react-icons/lib/fa/power-off'
import Window from '../Window.js'


class TopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        menuOpen:false,
      modal: false,
      modal_data:undefined
    }
    this.toggleNav =this.toggleNav.bind(this);
      this.toggleWindow =this.toggleWindow.bind(this);
  }

  toggleNav(){
      this.setState({
          menuOpen: !this.state.menuOpen
      })
  }

    toggleWindow(){
        this.setState({
            modal: !this.state.modal
        })
    }



  renderLoggedInBar(){

      return (
          <div>
              <Navbar color="blue" blue className="tb">
                     <div className="navWide"></div>
                      {this.props.info ? this.props.info.username : 'Carlos Redit' }
                      <div>
                          Fundos restantes: {this.props.info ? this.props.info.fundos : '10000000' } €
                      </div>
                      <div>
                          Ganhos: {this.props.info ? this.props.info.ganhos : '-937' } €
                      </div>
                      <Nav >
                          <NavItem eventkey={1} onClick={(key)=> this.toggleWindow(key)} className={"fundos"}>
                              <span className="far fa-money-bill-alt"></span>&nbsp;&nbsp;ADICIONAR FUNDOS >&nbsp;&nbsp;&nbsp;
                          </NavItem>
                          <NavItem eventkey={2} onClick={(key)=> {this.props.handle();console.log(key);}}>
                              <div className="icon">
                                  <i className="fas fa-power-off"></i>
                              </div>
                          </NavItem>
                      </Nav>
              </Navbar>
              <div className={"modal_close"}>
                  <Window isOpen={this.state.modal} data={this.state.modal_data} toggle={this.toggleWindow}/>
              </div>
          </div>
      );
  }



  render () {

    if(this.props.isLoggedIn()){
        return this.renderLoggedInBar();
    } else
    return (
        <nav className="tb">
            <div className="navWide">
				<div className="icon">
                            <i class="fas fa-power-off"></i>
                </div>
                <div className="wideDiv">
                </div>
            </div>
            <div className="navNarrow">
					<div className="narrowLinks">
					</div>
            </div>
			</nav>
    );
  }
}

export default TopBar;