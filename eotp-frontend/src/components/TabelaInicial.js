import React from 'react';
import TabelaModelo from './common/TabelaModelo.js';

//array inicial de stocs disponiveis
const initStocks = ['AAPL', 'MSFT', 'IBM', 'NVDA', 'AMD', 'TSLA'];

const col = [
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

class TabelaInicial extends React.Component {
  state = {
    stocks: [],
  };
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

  render(){
    return(
      <div>
        <TabelaModelo columns={col} data={this.state.stocks}/>
        <button type="button" onClick={() => this.processStocks()}>Testar API</button>
      </div>
    );
  }

}

export default TabelaInicial;