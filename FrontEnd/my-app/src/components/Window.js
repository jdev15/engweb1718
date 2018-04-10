import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Window extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      showModal: false,
      levantar: '',
      depositar: '',
      investimento: '',
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

  levantamento(l) {
    this.setState({ levantar: l });
  }

  deposito(d) {
    this.setState({ depositar: d });
  }

  render() {
    
    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Gerir Plafond
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Gestão do Plafond</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Levantamento de fundos</h4>
            <h5>Selecione abaixo a quantia que pretende levantar do plafond disponível</h5>
            <p>
            <input
                name="levantar"
                type="text"
                placeholder="Quantia" 
                onChange = {e => this.onChange(e)}
                value = {this.state.levantar}
                /> €
            </p>
            <Button onClick={this.close}>Levantar</Button>
            <h4>Depósito de fundos</h4>
            <h5>Selecione abaixo a quantia que pretende depositar na sua conta</h5>
            <p>
            <input
                name="depositar"
                type="text"
                placeholder="Quantia" 
                onChange = {e => this.onChange(e)}
                value = {this.state.depositar}
                /> €
            </p>
            <Button onClick={this.close}>Depositar</Button>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Fechar</Button>
          </Modal.Footer>
        </Modal>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
        Abrir Posição
        
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Abertura de Posições</Modal.Title>
            <a href="#" title="Informações" data-toggle="popover" data-trigger="hover" data-content="A abertura de posições está dependente do saldo monetário presente à data da abertura."><i class="fa fa-info">Info</i>
</a>
          </Modal.Header>
          <Modal.Body>
            <h2>TESLA INC (-0.98%)</h2>
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
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Fechar</Button>
          </Modal.Footer>
        </Modal>

      </div>      
    );
  }
}

export default Window;