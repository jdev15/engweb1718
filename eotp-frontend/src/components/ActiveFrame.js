import React, { Component } from 'react';
import ActiveSearch from './ActiveSearch.js';
import TableReact from './TableReact.js';
import "../css/Table.css"
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

      },
            {
        id: 'Nothing',
        name: 'NOTHING',
        img: 'default.png',
        type: 'Currencie Currencies currencie',
        sell_price: 2.5,
        variation: [0.4, 2.1, 1.1],
      }
    ],
    updated: false,
    search_text: '',
    search_type: '',
    selected_variation: '0',
    update_interval: 500 //ms

  }
    window.setInterval( () => {props.fetchdata();}, 60000);
    props.fetchdata();

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

    createColumns(){
        if( this.props.isLoggedIn){
            return [
                {
                    Header: "Nome do ativo",
                    accessor: "name"
                },
                {
                    Header: "Variacao",
                    id: "nomeeCompeticao",
                    accessor: d => d.variation[this.state.selected_variation]
                },
                {
                    Header: "Preço de venda",
                    accessor: "sell_price"
                },
                {
                    Header: "Preço de compra",
                    id: "precocompra",
                    accessor: d => (d.sell_price * 1.02).toFixed(2)
                }]
        }else{
         return  [
                {
                    Header: "Nome do ativo",
                    accessor: "name"
                },
                {
                    Header: "Variacao",
                    id: "nomeeCompeticao",
                    accessor: d => d.variation[this.state.selected_variation]
                },
                {
                    Header: "Preço de venda",
                    accessor: "sell_price"
                },
                {
                    Header: "Preço de compra",
                    id: "modalidade",
                    accessor: d => (d.sell_price * 1.02).toFixed(2)
                }
                ]
        }

    }

    filter_data_byName(data){
        const text = this.state.search_text.toUpperCase();
        return data.filter( data_row => data_row.id.indexOf(text) !== -1);
    }
    filter_data_byType(data){
        return data.filter( data_row => data_row.type.indexOf(this.state.search_text) !== -1);
    }

    filter(datas){
        if(this.state.search_type === 'Name')
            return this.filter_data_byName(datas);
        else if( this.state.search_type === 'Type')
            return this.filter_data_byType(datas);
        else return datas;
    }


	render(){
		return (
			<div>
			<div className='searchbar'>
				<ActiveSearch
					placeholder="Pesquisa..."
					onSubmit={(text,type) => this.handleSearchSubmit(text,type)} 
				/>
                <h5>Variacao  </h5>
                <span>
       				<select id='variacao_select' onChange={ () => this.handleSelectedChange()} >
  						<option value="0" defaultValue>1Horas</option>
  						<option value="1">4Horas</option>
  						<option value="2">1Dia</option>
					</select>
				</span>
			</div>
			<div className="reacttable" >
				<TableReact
						data= {this.filter(this.props.data)}
						variation_time={ this.state.selected_variation}
						classnames="tablereact"
                       columns = { this.createColumns()}
				 />
			</div>
			</div>)

	}


}


export default ActiveFrame;