import React, { Component } from 'react'
import Todo from "./Todo";
import TodoConsumer from '../context'
var uniqid = require('uniqid');
 
export default class Todos extends Component {

    deleteAllTodo(dispatch,e){
        dispatch({type:"DELETE_ALL_TODO",payload:""})
        e.preventDefault();
    }

    constructor(props){
        super(props);
        this.state={
            value:""
        };
    }

    valueChange=e=>{
        this.setState({value:e.target.value});

    }

  render() {
    return (
      <TodoConsumer>
          {
              value=>{
                  const {todos,dispatch}=value;
                  return (
                      <div className="card-body">
                        <h5 className="card-title">Todos</h5>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <input className="form-control" 
                                    type="text" name="filter" 
                                    placeholder="Search Todo"
                                    value={this.state.value}
                                    onChange={this.valueChange}/>
                            </div>
                        </div>
                        <hr/>
                        <ul className="list-group">
                            {
                                todos.map(todo=>{
                                    let isVisible=true;
                                    if(todo.title.indexOf(this.state.value)===-1){
                                        isVisible=false;
                                    }
                                    return(
                                        <Todo
                                        key={uniqid()}
                                        title={todo.title}  
                                        isVisible={isVisible}                                  
                                        />
                                    )
                                })
                            }  
                        </ul>
                        <hr/>
                        <a className="btn btn-dark" href="#" onClick={this.deleteAllTodo.bind(this,dispatch)}>Delete All Todo</a>               
                      </div>
                  )
              }
          }
      </TodoConsumer>
    )
  }
}
