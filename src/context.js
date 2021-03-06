import React, { Component } from 'react'

const todoContext=React.createContext();

const reducer=(state,action)=>{
  switch(action.type){
    case "DELETE_TODO":
    deleteTodofromLocalStorage(action.payload);
    return{
      ...state,
      todos: state.todos.filter(todo=>action.payload!==todo.id)
    }
    case "ADD_TODO":
    saveLocalStorage(action.payload);
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

function deleteTodofromLocalStorage(id){
    let todos=getLocalStorage();

    todos.forEach((todo,index) => {
        if(todo.id===id){
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

function saveLocalStorage(todo){
  let todos=getLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

export class TodoProvider extends Component {


  state={
    todos:[],
    dispatch:action=>{
      this.setState(state=>reducer(state,action))
    }
  }  

  componentDidMount() {
    this.setState({
      todos:getLocalStorage()
    });
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