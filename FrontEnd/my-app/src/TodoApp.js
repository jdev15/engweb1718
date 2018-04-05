import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter:'all',
      todos: [],
      todoCounter: 1
    }
    this.handleCleanTodos = this.handleCleanTodos.bind(this);
    //this.handleAllFilter = this.handleAllFilter.bind(this);
    //this.handleTodosFilter = this.handleTodosFilter.bind(this);
    //this.handleDoneFilter = this.handleDoneFilter.bind(this)
  }

  addTodo(description) {
    const newTodo = {
      description: description,
      done: false,
      id: this.state.todoCounter
    };

    this.setState({
      todos: this.state.todos.concat(newTodo),
      todoCounter: this.state.todoCounter + 1
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        } else {
          return todo;
        }
      })
    })
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
      filter:'todo'
    })
  }

  handleCleanTodos(){
    this.setState({
       filter:'all',
       todos: [],
       todoCounter:0
      });
  }

  handleSaveTodos(){

  }

  handleLoadTodos(){

  }



  handleAllFilter(){
    this.setState({
      filter:'all'
    });
    console.log(this.state);
  }

  handleTodoFilter(){
    this.setState({
      filter:'todo'
    });
    console.log(this.state);
  }

  handleDoneFilter(){
    this.setState({
      filter:'done'
    });
    console.log(this.state);
    this.render();
  }


  filtertodos(todos){
    if(this.state.filter==='all')
            return todos;
    else if( this.state.filter === 'todo')
            return todos.filter( todo => todo.done !== true);
    else if( this.state.filter === 'done')
            return todos.filter( todo => todo.done !== false);
  }

  render() {
    let todos = this.filtertodos(this.state.todos);
    console.log(todos);
    return (
      <div className="todo-app">
        <h1 className="title">{this.props.title}</h1>

        <div className="filters">
          <span onClick={ () => this.handleAllFilter() } >all</span> | <span 
           onClick={ () => this.handleTodoFilter() }>todo</span> | <span 
           onClick={ () => this.handleDoneFilter() } >done</span>
        </div>


        <div className="todos">
          <TodoInput
            placeholder="Add new todo"
            onSubmit={(description) => this.addTodo(description)} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onToggle={(id) => this.toggleTodo(id)}
            onRemove={(id) => this.removeTodo(id)}
          />
        </div>

        <div className="options">
          <span className="clean-todos" 
          onClick={ () => this.handleCleanTodos() }>🗑</span>
          <span className="save-todos"  role="img"
          onClick={ () => this.handleSaveTodos() }>🚀</span>
          <span className="load-todos"  role="img" 
                onClick={ () => this.handleLoadTodos() }>⬇</span>
        </div>

      </div>
    )
  }
}

export default TodoApp;
