import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/Profile.css';

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: 'placeholder@placeholder.com',
      password: '',
      pnome: 'Joe',
      lnome: 'Placeholder',
      tlm: 'placeholder',
    };
    this.packData = this.packData.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }



  componentDidMount() {
    const temp = this.props.data;
    this.setState({
      email: temp.email,
      pnome: temp.fname,
      lnome: temp.lname,
      tlm: temp.phone,
    });
    //console.log(this.props.data);
  }

  packData() {
    const data = {
      email: this.state.email,
      fname: this.state.pnome,
      lname: this.state.lnome,
      phone: this.state.tlm,
      credit: {},
      plafond: 0,
    }
    //console.log('test');
    this.props.close();
    if(this.state.password)
      this.props.changeUserData(data, this.state.password);
    else
      this.props.changeUserData(data, false);
    this.setState({
      password: '',
    })
  }


  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.close}>
          <ModalHeader toggle={this.props.close}>
            <p>Gerir Conta</p>
          </ModalHeader>
          <ModalBody>
            <h4>Dados da Conta</h4><br/>

            <h5>Email</h5>
            <input
              name="email"
              type="email"
              onChange = {e => this.onChange(e)}
              value = {this.state.email}
            /><br/>
            <h5>Nova Password</h5>
            <input
              name="password"
              type="password"
              onChange = {e => this.onChange(e)}
              value = {this.state.password}
            /><br/><br/>
            <h4>Dados Pessoais</h4><br/>
            <h5>Primeiro Nome</h5>
            <input
              name="pnome"
              type="text"
              onChange = {e => this.onChange(e)}
              value = {this.state.pnome}
            /><br/>
            <h5>Último Nome</h5>
            <input
              name="lnome"
              type="text"
              onChange = {e => this.onChange(e)}
              value = {this.state.lnome}
            /><br/>
            <h5>Telemóvel</h5>
            <input
              name="tlm"
              type="text"
              onChange = {e => this.onChange(e)}
              value = {this.state.tlm}
            />

          </ModalBody>
          <ModalFooter>
            <Button onClick={this.packData}>Guardar</Button>
            <Button onClick={this.props.close}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Profile;