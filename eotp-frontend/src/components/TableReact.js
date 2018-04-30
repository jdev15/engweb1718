import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


class TableReact extends React.Component {


    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    columns ={this.props.columns}
                    defaultPageSize={10}
                    className={this.props.classnames}
                />
            </div>
        );
    }
}

export default TableReact