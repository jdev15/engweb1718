import React, { Component } from 'react';

class ActiveSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' }
  }

  handleInputSubmit(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleReturnKey(event) {
    const value = event.target.value;
    if (event.key === 'Enter') {
      const docelem = document.getElementById("type_search");
      const type = docelem.options[docelem.selectedIndex].value;
      this.props.onSubmit(value,type);
    }
  }

  handleTypeChange(){
    const value = document.getElementById("search_input").value;
    if(value !== ''){
      const docelem = document.getElementById("type_search");
      const type = docelem.options[docelem.selectedIndex].value;
      this.props.onSubmit(value,type);
     }
  }
  

  render() {

    return (
        <div id="search">
          <input
             type="text"
             value={this.state.input}
             id="search_input"
             className="active_search"
             placeholder={this.props.placeholder}
             onChange={event => this.handleInputSubmit(event)}
             onKeyPress={event => this.handleReturnKey(event)}
           />
           <span> por </span>
          <select id="type_search" onChange={ () => this.handleTypeChange() }>
                    <option value="Name" defaultValue>Nome</option>
                    <option value="Type">Tipo</option>
          </select>
        </div>
    );
  }
}

export default ActiveSearch;