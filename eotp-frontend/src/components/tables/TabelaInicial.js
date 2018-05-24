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
      };
      this.toggle = this.toggle.bind(this);
  }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

  //obtem info dos ativos especificados em initStocks
  getCell = (data_basic, data_hours, data_day) => {
    //se os mercados estiverem abertos, calcula as variaçoes necessárias
    if(data_hours.range==="today") {
      const size = data_hours.data.length;
      var one; var four;
      //os mercados podem nao estar abertos o tempo suficiente para
      //haver valores de variaçao de 1h ou 4h
      if(size>60) {
        //calcular variaçao com base no valor medio sobre o preço mais recente
        one = 1-((data_hours.data[size-60].average)/(data_basic.latestPrice));
        //arredondar para 4 casas decimais
        one = Math.round(one * 10000) / 10000
      }
      else one = '---';
      //4h = 60m * 4 = 240m
      if(size>240) {
        four = 1-((data_hours.data[size-240].average)/(data_basic.latestPrice));
        four = Math.round(four * 10000) / 10000
      }
      else four = '---';
    }
    else {
      one='---'; four='---';
    }
    var a = {
      name: data_basic.symbol,
      var1d: data_day[data_day.length-1].changePercent,
      var4h: four,
      var1h: one,
      sell_price: data_basic.iexBidPrice,
      buy_price: data_basic.iexAskPrice
    };
    return a;
  };

  processStocks = async () => {
    var stockInfo = [];
    for(var i in initStocks) {
      const stock = initStocks[i];
      //chamar a api e buscar valores basicos de compra, venda e nome da stock
      const api_call_basic = await fetch(`https://api.iextrading.com/1.0/stock/${stock}/quote`);
      const data_basic = await api_call_basic.json();
      //chamar a api e buscar valores mais antigos de horas
      const api_call_hours = await fetch(`https://api.iextrading.com/1.0/stock/${stock}/chart/dynamic`);
      const data_hours = await api_call_hours.json();
      //chamar a api e buscar valor do ultimo dia
      const api_call_day = await fetch(`https://api.iextrading.com/1.0/stock/${stock}/chart/ytd`);
      const data_day = await api_call_day.json();
      
      //processa valores para formato aceitavel pela tabela
      const value = this.getCell(data_basic, data_hours, data_day);
      //insere valor processado para o array que será inserido na tabela
      stockInfo.push(value);
    }
    this.setState({
      stocks: stockInfo,
    });
  };

  updateState(data){
      this.setState({
          modal: true,
          modal_data:data
      })
      console.log(data);
  }

  createColumns(){
    if (this.props.isLoggedIn)
      return [
        {
          Header: "Ativo",
          accessor: "name"
        },
        {
          Header: "Variação 1D (%)",
          accessor: "var1d",
        },
        {
          Header: "Variação 4H (%)",
          accessor: "var4h",
        },
        {
          Header: "Variação 1H (%)",
          accessor: "var1h",
        },
        {
          Header: "Preço de Venda ($)",
          accessor:"sell_price",

        },{
          Header: "Preço de Compra ($)",
          accessor: "buy_price",
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
          accessor: "name"
        },
        {
          Header: "Variação 1D (%)",
          accessor: "var1d"
        },
        {
          Header: "Variação 4H (%)",
          accessor: "var4h"
        },
        {
          Header: "Variação 1H (%)",
          accessor: "var1h"
        },
        {
          Header: "Preço de Venda ($)",
          accessor:"sell_price"
        },{
          Header: "Preço de Compra ($)",
          accessor: "buy_price",
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

  render(){
    return(
      <div>
        <TabelaModelo columns={this.createColumns()} data={this.state.stocks}/>
          <div className={"modal_close"}>
              <Open showModal={this.state.modal} data={this.state.modal_data} close={this.toggle}/>
          </div><br/><br/>
          <footer className="footer">
            <button type="button" onClick={() => this.processStocks()}>Testar API</button>
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