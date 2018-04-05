import React, { Component } from 'react';


class Actives_Frame
 extends Component{

	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			filter_text: props.filter_text,
			filter_type: props.filter_type,
			variation_time: props.variation_time
		}
	}

	filter_data_byName(data){
		return data.filter( data_row => data_row.name.substring(this.state.filter_text) !== -1);
	}
	filter_data_byType(data){
		return data.filter( data_row => data_row.type.substring(this.state.filter_text) !== -1);
	}


	render(){
		let toShowData = [];
		if(this.state.filter_type === 'Name')
			toShowData = this.filter_data_byName(this.state.data);
		else if( this.state.filter_type === 'Type')
			toShowData = this.filter_data_byType(this.state.data);
	}


}


export default Actives_Frames;