import React, { Component } from 'react';
import TableReact from '../components/TableReact.js';
import Window from './Window.js'
import Trash from 'react-icons/lib/fa/trash'
import '../css/TabelapPortfolio.css'


class TabelaPortfolio extends  Component{

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
                return [
                    {
                        Header: "Ativo",
                        accessor: "name"
                    },
                    {
                        Header: "Close",
                        id: "close_price",
                        accessor: "close_price"
                    },
                    {
                        Header: "Open",
                        accessor: "open_price"
                    },
                    {
                        Header: "Sell",
                        accessor:"sell_price"
                    },{
                        Header: "Buy",
                        id: "precocompra",
                        accessor: d => (d.sell_price * 1.02).toFixed(2)
                    },{
                        Header: "Invested",
                        accessor: "invested"
                    },{
                        Header: "Remove",
                        accessor: "invested",
                        Cell: (row) => { return ( <div className="trash_icon" onClick={() => {console.log(row); this.openModal(row);}}><Trash /></div>);},
                        maxWidth: 120
                    }]

    }


    render(){

        return (
            <div>
                <div className={"tabela_portfolio"}>
                <TableReact data= { this.props.data ? this.props.data : []}
                            columns = { this.createColumns()}
                            classnames="tabelaportfolio"/>
                </div>
                <div className={"modal_close"}>
                        <Window isOpen={this.state.modal} data={this.state.modal_data} toggle={this.toggle}/>
                </div>
                <Window/>
            </div>
        )
    }

}


export default TabelaPortfolio
