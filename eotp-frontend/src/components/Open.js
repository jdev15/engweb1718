import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Open extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      showModal: true,
      investimento: '',
      nomeAtivo: '',
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
            <h1>{this.state.nomeAtivo}</h1>
          </ModalHeader>
          <ModalBody>
            <p>
            <input
                name="modalidade"
                type="text"
                placeholder="Quantia" 
                onChange = {e => this.onChange(e)}
                value = {this.state.depositar}
                /> €
            </p>
            <h5>Indique abaixo a quantia que pretende investir</h5>
            <p>
            <input
                name="investimento"
                type="text"
                placeholder="Quantia" 
                onChange = {e => this.onChange(e)}
                value = {this.state.investimento}
                /> €
            </p>
            <h5>Quantia baseada no valor atual de mercado: 175€</h5>
            <hr/>
            <h7>Os valores considerados serão aqueles que constem do mercado no momento da abertura da posição, ou no momento em que o mesmo abrir.</h7><br/><br/>
            <Button onClick={this.close}>Abrir Posição</Button>
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

export default Open;