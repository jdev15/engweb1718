import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import '../css/window.css';

class Open extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      investimento: '',
      nomeAtivo: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderHeader(data) {
    if(data)
      return "Abrir Posição - "+data.name;
    else return "Abrir Posição";
  }

  getValue(data) {
    if(data)
      return data.buy_price;
    else return 0
  }

  getInvestment(data) {
    if(data)
      //a ser substituido pelo valor a ser investido
      return data.buy_price*12
    else return 0
  }

  render() {
    return (
      <div>
        <Modal className="openpos"   isOpen={this.props.showModal} toggle={this.props.close}>
          <ModalHeader toggle={this.props.close}>
            {this.renderHeader(this.props.data)}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="type">Tipo de Investimento</Label>
              <Input type="select" name="select" id="type">
                <option>Compra</option>
                <option>Venda</option>
              </Input>
            </FormGroup>
            <p>Indique abaixo a quantidade que pretende investir</p>
            <FormGroup>
              <Label for="stocknum">Número de ações</Label>
              <Input type="number" name="number" id="stocknum" placeholder="100" />
            </FormGroup>
            <p id="openpos_value">Valor atual de mercado: {this.getValue(this.props.data)}$</p>
            <p>Quantia baseada no valor atual de mercado: {this.getInvestment(this.props.data)}$</p>
            <hr/>
            <p id="openpos_note">Os valores considerados serão aqueles que constem do mercado no momento da abertura da posição, ou no momento em que o mesmo abrir.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.close}>Abrir Posição</Button>
            <Button onClick={this.props.close}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Open;