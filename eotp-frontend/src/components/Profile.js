import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/Profile.css';

class Manager extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      showModal: true,
      email: 'joaonuno.almeida01@gmail.com',
      password: '12345',
      username: 'jnalm',
      pnome: 'João Nuno',
      lnome: 'Almeida',
      tlm: '915840330',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.close}>
          <ModalHeader closeButton>
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
            <h5>Username</h5>
            <input
              name="username"
              type="text"
              onChange = {e => this.onChange(e)}
              value = {this.state.username}
            /><br/>
            <h5>Password</h5>
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
            <Button onClick={this.props.close}>Guardar</Button>
            <Button onClick={this.props.close}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Manager;