import React, { Component } from 'react';
import Window from './Window.js';
import './activeframe.css';

class ActiveList extends Component{ 

	constructor(props){
		super(props);
		/*
			variation_number: Number(this.props.variation_time) // 1H = 0, 4H = 1, 1D = 2
		}*/
	}

	filter_data_byName(data){
		const text = this.props.filter_text.toUpperCase();
		return data.filter( data_row => data_row.name.indexOf(text) !== -1);
	}
	filter_data_byType(data){
		return data.filter( data_row => data_row.type.indexOf(this.props.filter_text) !== -1);
	}


	toRender(){
		let toShowData= this.props.data;

		if(this.props.filter_type === 'Name')
				toShowData = this.filter_data_byName(this.props.data);
		else if( this.props.filter_type === 'Type')
				toShowData = this.filter_data_byType(this.props.data);
		/*console.log(this.props.filter_type);
		console.log(this.props.filter_text);
		console.log(toShowData);*/
		const variation = Number(this.props.variation_time);
		return toShowData.map( data => ( <div id="new_row" key={data.name}>
										 <li id="row_image"><img src={data.img} alt={data.name}></img></li>
						   				 <li id="row_name">{data.name}</li>
						   				 <li id="row_variation">{data.variation[variation]}</li>
						   				 <li id="row_selling_price">{data.sell_price}</li>
						   				 <li id="row_buying_price">{(data.sell_price * 1.02).toFixed(2)}</li>
						   				 </div> ) 
							);
		/*
		return this.props.data.map( data => ( <div id="new_row" key={data.name}>
										 <li id="row_image"><img src={data.img} alt={data.name}></img></li>
						   				 <li id="row_name">{data.name}</li>
						   				 <li id="row_variation">{data.variation[variation]}</li>
						   				 <li id="row_selling_price">{data.sell_price}</li>
						   				 <li id="row_buying_price">{(data.sell_price * 1.02).toFixed(2)}</li>
						   				 </div> ) 
							);*/

	}

	render(){
		return ( <div id='my_list'>
				<ul>
				  { this.toRender()}
				</ul>
				</div>
			);
	}


}

export default ActiveList;


