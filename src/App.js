import React, { Component } from 'react';
import AddTodo from './components/AddTodo'
import Todos from "./components/Todos";
class App extends Component {
  render() {
    return (
      <div className="container" style={{marginTop:"20px"}}>
      <div className="card row">
        <div className="card-header">Todo List</div>
        <AddTodo/>
        <hr/>
        <Todos/>
        </div>
      </div>
    );
  }
}

export default App;
