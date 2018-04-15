import React from 'react';
//components
import TabelaAtivos from './components/TabelaAtivos';
import SideBar from './components/SideBar';
//styles
//import './css/App.css';

//a ser ajustado
const initStocks = ['AAPL', 'MSFT', 'IBM', 'NVDA', 'AMD', 'TSLA'];

class App extends React.Component {

  state = {
    stocks: [],
  }

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

  render() {
    return (
      <div>
        <SideBar />
        <TabelaAtivos tableInfo={this.state.stocks}/>
        <button onClick = {() => this.processStocks()}>Update Table (Temp)</button>
      </div>
    );
  }
}

export default App;
