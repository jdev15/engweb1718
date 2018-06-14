import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import '../css/window.css';

class Open extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isSell: false,
      investimento: '1',
      token: this.props.token,
    };
    this.openPosition =this.openPosition.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderHeader(data) {
    if(data) {
      //console.log(this.state.nomeAtivo);
      return "Abrir Posição - "+data.simbolo;
    }
    else return "Abrir Posição";
  }

  getValue(data) {
    if(data)
      if(this.state.isSell) return data.preco_de_venda;
      else return data.preco_de_compra;
    else return 0
  }

  getInvestment(data) {
    if(data)
      //a ser substituido pelo valor a ser investido
      return data.buy_price*12;
    else return 0
  }

  changeTypeInv(e) {
    //console.log(e.target.value);
    if(e.target.value==='1') {
      //console.log('Compra');
      this.setState({
        isSell: false,
      })
    }
    else {
      //console.log('Venda');
      this.setState({
        isSell: true,
      })
    }
  }

  changeInvestment(e) {
    //console.log(e.target.value);
    this.setState({
      investimento: e.target.value,
    })
  }

  async openPosition() {
    var invest, price, newPlaf;
    if(this.state.isSell) {
      invest = this.state.investimento*this.props.data.preco_de_venda;
      price = this.props.data.preco_de_venda;
    }
    else {
      invest = this.state.investimento*this.props.data.preco_de_compra;
      price = this.props.data.preco_de_compra;
    }
    //console.log('TOKEN OPEN: '+this.props.token);
    newPlaf = this.props.plafond-this.props.investimento;
    await fetch('http://localhost:4000/data/openpos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.token,
        name: this.props.data.simbolo,
        units: this.state.investimento,
        invest: invest,
        price: price,
        plafond: newPlaf,
      }),
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro a abrir posição!");
        const test = await res.json();
        console.log(res);
        console.log(test);
      }
      else {
        this.props.close();
      }
    });
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
              <Input type="select" name="select" id="type" onChange={(e) => this.changeTypeInv(e)}>
                <option value="1">Compra</option>
                <option value="2">Venda</option>
              </Input>
            </FormGroup>
            <p>Indique abaixo a quantidade que pretende investir</p>
            <FormGroup>
              <Label for="stocknum">Número de ações</Label>
              <Input type="number" name="number" id="stocknum" placeholder="1" onChange={(e)=>this.changeInvestment(e)}/>
            </FormGroup>
            <p id="openpos_value">Valor atual de mercado: {this.getValue(this.props.data)}$</p>
            <p>Quantia baseada no valor atual de mercado: {this.getInvestment(this.props.data)}$</p>
            <hr/>
            <p id="openpos_note">Os valores considerados serão aqueles que constem do mercado no momento da abertura da posição, ou no momento em que o mesmo abrir.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>this.openPosition()}>Abrir Posição</Button>
            <Button onClick={this.props.close}>Fechar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Open;