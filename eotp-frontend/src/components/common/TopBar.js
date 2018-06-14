import React from 'react';
import '../../css/topbar.css'
import { Navbar,Nav,NavItem } from 'reactstrap';
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
        <Navbar color="blue" className="tb">
          <div className="navWide"></div>
          Bem-Vindo, {this.props.user ? this.props.user : 'Placeholder' }
          <div>
            Fundos restantes: {this.props.data.plafond ? this.props.data.plafond : 'Unknown' } €
          </div>
          <div>
            Balanço: {this.props.info ? this.props.info.ganhos : '0' } €
          </div>
          <Nav >
            <NavItem eventkey={1} onClick={(key)=> this.toggleWindow(key)} className={"fundos"} style={{cursor:'pointer'}}>
              <span className="far fa-money-bill-alt"></span>&nbsp;&nbsp;GERIR FUNDOS &nbsp;&nbsp;&nbsp;
            </NavItem>
            <NavItem eventkey={2} onClick={this.props.loggedOut} style={{cursor:'pointer'}}>
              <div className="icon">
                <i className="fas fa-power-off"></i>
              </div>
            </NavItem>
          </Nav>
        </Navbar>
        <div className={"modal_close"}>
          <Window
            isOpen={this.state.modal}
            data={this.state.modal_data}
            toggle={this.toggleWindow}
            changePlafond={this.props.changePlafond}/>
        </div>
      </div>
    );
  }



  render () {
    if(this.props.isLoggedIn()){
      return this.renderLoggedInBar();
    }
    else return(
      <nav className="tb">
        <div className="navWide">
          <div className="icon">
            <i className="fas fa-power-off" style={{opacity: 0}}></i>
          </div>
          <div className="wideDiv"></div>
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