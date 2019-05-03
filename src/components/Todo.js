import React, { Component } from "react";
import UserConsumer from "../context";
import "../App.css";
class Todo extends Component {
  deleteTodo = (dispatch, e) => {
    e.preventDefault();
    const{id}=this.props;
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  render() {
    const { title, isVisible } = this.props;
    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;
          return (
            <li
              className={
                isVisible
                  ? "list-group-item d-flex justify-content-between"
                  : "todoNone"
              }
            >
              {title}
              <a href="#" className="delete-item">
                <i
                  className="fa fa-remove"
                  onClick={this.deleteTodo.bind(this, dispatch)}
                />
              </a>
            </li>
          );
        }}
      </UserConsumer>
    );
  }
}
export default Todo;
