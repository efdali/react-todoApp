import React from "react";
import TodoConsumer from "../context";
var uniqid = require("uniqid");

class Form extends React.Component {
  state = {
    todo: ""
  };

  textChange = e => {
    this.setState({
      todo: e.target.value
    });
  };

  addTodo = (dispatch, e) => {
      e.preventDefault();
      const{todo}=this.state;
      if(todo.trim()===""){
        return;
      }
      const id=uniqid();
      dispatch({type:"ADD_TODO",payload:{id:id,title:todo}});
      this.setState({todo:""});
  };

  render() {
    return (
      <TodoConsumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card-body">
              <form onSubmit={this.addTodo.bind(this,dispatch)}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        placeholder="Enter Todo"
                        name="todo"
                        value={this.state.todo}
                        onChange={this.textChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger"
                  >
                    Add Todo
                  </button>
              </form>
            </div>
          );
        }}
      </TodoConsumer>
    );
  }
}
export default Form;
