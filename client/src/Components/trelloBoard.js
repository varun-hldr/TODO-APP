import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as USER from "../api/apiActions.js";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GroupTasks from './GroupTasks';


class TrelloBoard extends Component {
  state = {
    user: {},
    text: "Login to manage your account",
    // tasks: [{
    //     "id":"123",
    //     "task":"Buy Grocery",
    //     "group": "To DOs",
    //     "createdAt": "",
    //     "comleteAt": "",
    //     "completed": false,
    //     "favorite": false,
    //     "tags": ["Urgent","Gyan"]
    // }],
    // groups: [
    //     {id:1, name: "To DOs"},
    //     {id:2, name: "On going"},
    //     {id:3, name: "Done"}
    // ]
  };
  
  async componentDidMount(){
    const todos = await USER.getUserTodos(localStorage.getItem("_tkn"));
    this.props.dispatch({
      type: "USER_TODOS",
      payload: [...todos.todos],
    });
    console.log("====todos==>", todos);

  }

  handleTask = async (e, task) => {
    console.log("Going to handle task", e, task)
    e.preventDefault();
    
    if(task._id){
      // Update
      console.log("Form update Event", task);
      await USER.updateToDo(task._id, {task: task.task, group: task.group}, localStorage.getItem("_tkn"));
    }else{
      // Create
      console.log("Form create Event");
      await USER.addTodos(task, localStorage.getItem("_tkn"));
    }
    const todos = await USER.getUserTodos(localStorage.getItem("_tkn"));
    this.props.dispatch({
      type: "USER_TODOS",
      payload: [...todos.todos]
    });
    
  }

  render() {
    if (!localStorage.getItem("_tkn")) {
      return <Redirect to="/login" />;
    }
    // const groups = this.formatTodos(this.state.groups, this.state.tasks);
    // console.log("================>>>",this.props.todos);
    return (
        <Container fluid>
        <Row > 
            <Col>
              <p>Your All Tasks</p>
            </Col>
        </Row>
        <Row>
            {this.props.todos && this.props.todos.map(group => <Col md={{span:3}} key={group.id}><GroupTasks group={group.group} 
                  tasks={group.tasks} 
                  id={group.id}
                  handleTask={this.handleTask}
                  toggleFavorite={this.toggleFavorite}
                  toggleComplete={this.toggleComplete}
                  deleteToDo={this.deleteToDo}
                  /></Col>)}
        </Row>
    </Container> 
     
    );
  }
}

function mapStateToProps({todos}) {
  console.log("Treloo Board Mapping", todos);
  return {todos: todos.todos};
}

export default connect(mapStateToProps)(TrelloBoard);