import React, { Component } from 'react'

const todoContext=React.createContext();

/*
const changeTodosVisibilty=(todos,query)=>{

  todos.forEach(todo => {
    if(todo.indexOf(query)===-1){
        todo.isVisible=false;
    }else{
      todo.isVisible=true;
    }
  });
  return todos;

}
*/

const reducer=(state,action)=>{
  switch(action.type){
    case "DELETE_TODO":
    return{
      ...state,
      todos: state.todos.filter(todo=>action.payload!==todo.title)
    }
    case "ADD_TODO":
    return {
      ...state,
      todos:[...state.todos,action.payload]
    }
    case "DELETE_ALL_TODO":
    return{
      ...state,
      todos:[]
    }
    default:
      return state;
  }
}


export class TodoProvider extends Component {


  state={
    todos:[{title:"Todo1"},{title:"Todo2"}],
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