import React, { Component } from 'react';
import ActiveList from './ActiveList.js';
import ActiveSearch from './ActiveSearch.js';
import './activeframe.css';

class ActiveFrame extends Component{

constructor(props){
  super(props);
  this.state = {
    data: [
      {
        id: 'AMZ',
        name: 'AMZ',
        img: 'default.png',
        type: 'Action action',
        sell_price: 10.5,
        variation: [-0.2, 0.5, 0.1],

      },
      {
        id: 'APPZ',
        name: 'APPZ',
        img: 'default.png',
        type: 'Action action',
        sell_price: 99.5,
        variation: [-0.5, 0.1, 0.0],

      },
      {
        id: 'ETHER',
        name: 'ETHEREUM',
        img: 'default.png',
        type: 'Action action',
        sell_price: 1000.33,
        variation: [-0.5, -0.1, -1.0],

      }
    ],
    updated: false,
    search_text: '',
    search_type: '',
    selected_variation: '0',
    update_interval: 500 //ms

  }
}


	handleSelectedChange(){
		const docelem = document.getElementById("variacao_select");
		this.setState({
			selected_variation: docelem.options[docelem.selectedIndex].value
		});
	}

	handleSearchSubmit(searchtext,type){
		this.setState({
			search_text:searchtext,
			search_type:type
		})
	}


	render(){
		return (
			<div>
			<div className='searchbar'>
				<ActiveSearch
					placeholder="Pesquisa..."
					onSubmit={(text,type) => this.handleSearchSubmit(text,type)} 
				/>
			</div>
			<div className='table_div'>
				<table className='table'>
 				 <thead>
     				 <tr>
       					 <th className='name-header'> Nome do ativo </th>
       					 <th className='variation-header'> <span>Variacao  </span>
       					 	<span>
       					 		<select id='variacao_select' onChange={ () => this.handleSelectedChange()} >
  									<option value="0" defaultValue>1Horas</option>
  									<option value="1">4Horas</option>
  									<option value="2">1Dia</option>
								</select>
							</span>
						</th>
       					 <th className='sellprice-header'> Preço de venda </th>
       					 <th className='buyprice-header'> Preço de compra </th>
   				 	  </tr>
 				 </thead>
				</table>
			</div>
			<div className="activeList" >
				<ActiveList 
						data= {this.state.data}
						filter_text= {this.state.search_text}
						filter_type= {this.state.search_type}
						variation_time={ this.state.selected_variation}
						isLoggedIn= {() => this.props.loggedIn}
				 />
			</div>
			</div>)

	}


}


export default ActiveFrame;