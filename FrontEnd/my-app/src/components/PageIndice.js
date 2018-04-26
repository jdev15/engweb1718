import React, { Component } from 'react';
import ActiveFrame from './ActiveFrame.js';
import TabelaAtivos from './TabelaAtivos.js';
import HeaderNotLogIn from './HeaderNotLogIn.js';

class PageIndice extends Component{

constructor(props){
  super(props);
  this.state = {
    data: [],
    isLoading:true
  }
}

  
  getData(){ 
    /*
    return fetch("https://api.coinmarketcap.com/v1/ticker/?limit=20")
    .then( (response) => response.json())
    .then( (responsejson) => {

      // Examine the text in the response
       this.setState( {
         data : this.dataDeserialize(responsejson),
         isLoading:false
        }, function(){

        });

      })
      .catch( function(err) {
             console.log( err);
      });*/
    var stockInfo = [];
    for(var i in initStocks) {
      const stock = initStocks[i];
      const api_call = await fetch(`https://api.iextrading.com/1.0/stock/${stock}/quote`);
      const data = await api_call.json();
      stockInfo.push(data);
    }
    console.log(stockInfo);
    this.setState({
      data: stockInfo,
    });
  }


  dataDeserialize(jsondata){
      return jsondata.map( row => { return {  
        id: row.name.toUpperCase(),
        name: row.name,
        img: 'default.png',
        type: 'Action action',
        sell_price: Number(row.price_usd),
        variation: [ Number(row.percent_change_1h),
                     Number(row.percent_change_24h),
                     Number(row.percent_change_7d)]
      };
    });
  }



	render(){ 
  
		return (
      <div>
			 <div className="header_topIndice">
            <HeaderNotLogIn/>
      </div>
      <div className="frameAtivos">
         <ActiveFrame isLoggedIn={this.props.loggedIn} fetchdata={() =>{ this.getData();}} data={this.state.data}/>
      </div>
      </div>
      );
/*
    return (
      <div>
       <div className="header_topIndice">
            <HeaderNotLogIn/>
      </div>
      <div className="frameAtivos">
         <TabelaAtivos />
      </div>
      </div>
      );*/
	}


}


export default PageIndice;