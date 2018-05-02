import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Window from './Window.js'
import '../css/TabelaModelo.css'


class TabelaModelo extends  Component{

    constructor(props){
        super(props);
        this.state = {
            modal:false,
            modal_data: undefined
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    openModal(row){
        this.setState( {
            modal:true,
            modal_data:row
        })
    }

    createColumns(){
      return this.props.columns;

    }


    render(){

        return (
            <div>
                <div className={"tabela_portfolio"}>
                <ReactTable data= { this.props.data ? this.props.data : []}
                            columns = {this.props.columns}
                            classnames="tabelaportfolio"
                            pageSizeOptions={[5, 10, 13, 20, 25, 50, 100]}
                            defaultPageSize={13}
                            />
                </div>
                <div className={"modal_close"}>
                        <Window isOpen={this.state.modal} data={this.state.modal_data} toggle={this.toggle}/>
                </div>
                <Window/>
            </div>
        )
    }

}


export default TabelaModelo
