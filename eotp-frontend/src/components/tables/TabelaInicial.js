import React from 'react';
import { Button } from 'reactstrap';
import Dollar from 'react-icons/lib/fa/dollar';
import TabelaModelo from '../common/TabelaModelo.js';
//import Window from '../Window.js'
import Open from '../Open.js'
import '../../css/TabelaInicial.css';

//array inicial de stocs disponiveis
var initStocks = ['AAPL', 'MSFT', 'IBM', 'NVDA', 'AMD', 'TSLA'];

class TabelaInicial extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          stocks: [],
          modal:false,
          modal_data: undefined,
          ativo: '',
          path: "192.168.43.86:4500/api/ativos/from",
          hasUpdated: false,
      };
      this.toggle = this.toggle.bind(this);
      this.updateInitStocks = this.updateInitStocks.bind(this);
  }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

  updateState(data){
      this.setState({
          modal: true,
          modal_data:data
      });
      console.log(data);
  }


  getStock(){
    Promise.all( initStocks.map( stock => fetch(`http://${this.state.path}/?query=${stock}`) ) )
        .then( list => list.map(s => s.json()))
        .then( promises => Promise.all(promises))
        .then( values => {console.log(values); return values})
        .then( values => this.setState({ stocks: values}));
  }

  getBachStock(){
    let string = '';
      initStocks.forEach(s => { string = string + s + ',';});
           fetch(`http://${this.state.path}/?query=${string}`)
          .then( list => list.json())
          .then( values => {console.log(values); return values})
          .then( values => this.setState({ stocks: values}));
  }

  createColumns(){
    if (this.props.isLoggedIn)
      return [
        {
          Header: "Ativo",
          id: "nome",
          accessor: d => d.nome ? d.nome : ''
        },
        {
            Header: "Variação 1D (%)",
            id: "var1d",
            accessor: d => d.variacaos ? (d.variacaos.d1 ? d.variacaos.d1 : '--'): '--'
        },
        {
          Header: "Variação 4H (%)",
          id:    "var4h",
          accessor: d => d.variacaos ? (d.variacaos.h4 ? d.variacaos.h4 : '--'): '--'
        },
        {
          Header: "Variação 1H (%)",
          id: "var1h",
          accessor: d => d.variacaos ? (d.variacaos.h1 ? d.variacaos.h1 : '--'): '--'
        },
        {
          Header: "Preço de Venda ($)",
          id:"preco_de_venda",
          accessor: 'preco_de_venda'

        },{
          Header: "Preço de Compra ($)",
          id:  "preco_de_compra",
          accessor: 'preco_de_compra'
        },
        {
          Header: 'Abrir Posição',
          Cell: row => (
              <Button color="primary" onClick={()=> {this.updateState(row.original);}}><Dollar /></Button>
          ),
          sortable: false,
          style:{overflow:'visible'},
        }];
    else
      return [
          {
              Header: "Ativo",
              id: "nome",
              accessor: d => d.nome ? d.nome : ''
          },
          {
              Header: "Variação 1D (%)",
              id: "var1d",
              accessor: d => d.variacaos ? (d.variacaos.d1 ? d.variacaos.d1 : '--'): '--'
          },
          {
              Header: "Variação 4H (%)",
              id:    "var4h",
              accessor: d => d.variacaos ? (d.variacaos.h4 ? d.variacaos.h4 : '--'): '--'
          },
          {
              Header: "Variação 1H (%)",
              id: "var1h",
              accessor: d => d.variacaos ? (d.variacaos.h1 ? d.variacaos.h1 : '--'): '--'
          },
        {
          Header: "Preço de Venda ($)",
          accessor:"preco_de_venda"
        },{
          Header: "Preço de Compra ($)",
          accessor: "preco_de_compra",
      }];
    }


  addAtivo(ativo) {
    initStocks.push(ativo);
  }

  handleInputSubmit(event) {
    this.setState({
      ativo: event.target.value
    });
  }

  handleReturnKey(event) {
    const value = event.target.value;
    if (event.key === 'Enter' && value !== '') {
      this.addAtivo(this.state.ativo);
      this.setState({ativo : ''});
    }
  }

  async updateInitStocks(token) {
    //console.log('infunction: '+token);
    await fetch('http://localhost:4000/data/getwatchlist', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then(async (res) => {
      if(!res.ok) {
        alert("Erro a definir ativos do User!");
        const test = await res.json();
        console.log(res);
        console.log(test);
      }
      else {
        const proc = await res.json();
        initStocks = proc.data;
        console.log(initStocks);
      }
    })
  }

  render(){
    if(this.props.isLoggedIn && this.props.token && !this.state.hasUpdated) {
      this.updateInitStocks(this.props.token);
    }
    return(
      <div>
        <TabelaModelo columns={this.createColumns()} data={this.state.stocks}/>
          <div className={"modal_close"}>
              <Open showModal={this.state.modal} data={this.state.modal_data} close={this.toggle} token={this.props.token} plafond={this.props.plafond}/>
          </div><br/><br/>
          <footer className="footer">
            <button type="button" onClick={() => this.getBachStock()/*this.getStock()this.processStocks()*/}>Buscar ativos</button>
            <a className="add">ADICIONAR ATIVOS</a>
            <div className="icon">
             <input
                name="adiciona"
                type="text"
                placeholder="Símbolo NASDAQ"
                value={this.state.ativo}
                onChange={event => this.handleInputSubmit(event)}
                onKeyPress={event => this.handleReturnKey(event)}
                />
            </div>
          </footer>
      </div>
    );
  }
}

export default TabelaInicial;