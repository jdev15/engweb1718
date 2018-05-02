import React from 'react';
import TabelaModelo from './TabelaModelo.js';

//array inicial de stocs disponiveis
const initStocks = ['AAPL', 'MSFT', 'IBM', 'NVDA', 'AMD', 'TSLA'];

const col = [
{
  Header: "Ativo",
  accessor: "name"
},
{
  Header: "Variação 1D",
  accessor: "var1d"
},
{
  Header: "Variação 4H",
  accessor: "var4h"
},
{
  Header: "Variação 1H",
  accessor: "var1h"
},
{
  Header: "Preço de Venda ($)",
  accessor:"sell_price"
},{
  Header: "Preço de Compra ($)",
  accessor: "precocompra",
}];

class TabelaInicial extends React.Component {
  //obtem info dos ativos especificados em initStocks
  processStocks = async () => {
    var stockInfo = [];
    for(var i in initStocks) {
      const stock = initStocks[i];
      const api_call = await fetch(`https://api.iextrading.com/1.0/stock/${stock}/quote`);
      const data = await api_call.json();
      stockInfo.push(data);
    }
    console.log(stockInfo);
    this.setState({
      stocks: stockInfo,
    });
  };

  render(){
    return(
      /*<div>
        <SideBar />
        <TabelaAtivos isLoggedIn={false} />
        <button onClick = {() => this.processStocks()}>Update Table (Temp)</button>
      </div>*/
      <div>
        <TabelaModelo columns={col}/>
      </div>
    );
  }

}

export default TabelaInicial;