import React, { Component } from 'react'

const todoContext=React.createContext();

const reducer=(state,action)=>{
  switch(action.type){
    case "DELETE_TODO":
    deleteTodofromLocalStorage(action.payload);
    return{
      ...state,
      todos: state.todos.filter(todo=>action.payload!==todo.title)
    }
    case "ADD_TODO":
    writeLocalStorage(action.payload);
    return {
      ...state,
      todos:[...state.todos,action.payload]
    }
    case "DELETE_ALL_TODO":
    deleteAllTodosFromStorage();
    return{
      ...state,
      todos:[]
    }
    default:
      return state;
  }
}

function deleteAllTodosFromStorage(){
  localStorage.setItem("todos",JSON.stringify([]));
}

function deleteTodofromLocalStorage(title){
    let todos=getLocalStorage();

    todos.forEach((todo,index) => {
        if(todo.title===title){
          todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getLocalStorage(){
    let todos;
    if(localStorage.getItem("todos")===null)
    todos=[];
    else
    todos=JSON.parse(localStorage.getItem("todos"));

    return todos;
}

function writeLocalStorage(todo){
  let todos=getLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

export class TodoProvider extends Component {


  state={
    todos:getLocalStorage(),
    dispatch:action=>{
      this.setState(state=>reducer(state,action))
    }
  }  

  render() {
    return (
      <todoContext.Provider value={this.state}>
        {this.props.children}
      </todoContext.Provider>
    )
  }
}

const TodoConsumer=todoContext.Consumer;

export default TodoConsumer;