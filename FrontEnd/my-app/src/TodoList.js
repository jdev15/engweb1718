import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props){
    super(props);
  }

  filtertodos(todos){
    if(this.props.filter==='all')
            return todos;
    else if( this.props.filter === 'todo')
            return todos.filter( todo => todo.done !== true);
    else if( this.props.filter === 'done')
            return todos.filter( todo => todo.done !== false);
  }

  render() {
    console.log(this.props.todos);
    return (
      <ul className="todo-list">
        {
          this.filtertodos(this.props.todos).map(todo => (
            <li className={todo.done ? 'todo-item done' : 'todo-item'}>
              <span className="description"
                onClick={() => this.props.onToggle(todo.id)}
              >
                {todo.description}
              </span>
              <span className="remove"
                onClick={() => this.props.onRemove(todo.id)}
              >✖</span>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default TodoList;
