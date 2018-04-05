import React, { Component } from 'react';

class TodoInput extends Component {
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
    if (event.key === 'Enter' && value !== '') {
      this.setState({ input: '' });
      this.props.onSubmit(value);
    }
  }

  render() {
    return <input
      type="text"
      value={this.state.input}
      className="add-todo"
      placeholder={this.props.placeholder}
      onChange={event => this.handleInputSubmit(event)}
      onKeyPress={event => this.handleReturnKey(event)}
    />
  }
}

export default TodoInput;