import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      todos: [],
      filtered: [],
    };
  }

  componentWillMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        const todos = response.data;
        this.setState({ todos, filtered: todos });
      })
      .catch(err => console.log(err));
  }

  handleStatusChange(e) {
    const value = e.target.value;
    let filtered = [...this.state.todos];
    if (value === 'all')
      filtered = filtered;
    if (value === 'completed')
      filtered = filtered.filter(todo => todo.completed)
    if (value === 'incomplete')
      filtered = filtered.filter(todo => !todo.completed)

    this.setState({ filtered });
  }

  renderTodo(todo) {
    return (
        <tr key={todo.id}>
          <td>{ todo.id }</td>
          <td>{ todo.title }</td>
          <td>{ todo.completed.toString() }</td>
        </tr>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <input type="text" name="query" value="" ref={(input) => this.query = input} />
          <select name="status" ref={(input) => this.status = input} onChange={e => this.handleStatusChange(e)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>id</td>
                <td>Title</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {this.state.filtered.map(this.renderTodo)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
