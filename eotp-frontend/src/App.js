import React from 'react';
//components
import TabelaAtivos from './components/TabelaAtivos';
import SideBar from './components/SideBar';
import TabelaPortfolio from './Portfolio/TabelaPortfolio.js'
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
              <TabelaPortfolio data={[{
                  name:"APPLE",
                  close_price:"325.6",
                  open_price:"325.96",
                  sell_price: "321.77",
                  invested: "100"
              }]}/>
          </div>
      );
   /* return (
      <div>
        <SideBar />
        <TabelaAtivos isLoggedIn={false} />
        <button onClick = {() => this.processStocks()}>Update Table (Temp)</button>
      </div>
    );*/
  }
}

export default App;
