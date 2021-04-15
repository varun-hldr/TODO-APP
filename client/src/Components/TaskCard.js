import React from 'react';
import { Container, Row, Col, Form }  from 'react-bootstrap';
import { Star, StarFill, XCircle, Pencil } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import * as USER from "../api/apiActions.js";


const toggleFavorite = async (e, tid, dispatch) => {
    // e.preventDefault();
    console.log("Toggle Favorite called", tid, e);
    await USER.toggleFavorite(tid, localStorage.getItem("_tkn"))
    const todos = await USER.getUserTodos(localStorage.getItem("_tkn"));
    dispatch({
      type: "USER_TODOS",
      payload: [...todos.todos]
    });
  }

  const toggleComplete= async (e, tid, dispatch)=>{
    // e.preventDefault();
    alert("Complete Toggle caled"+ tid);
    await USER.toggleComplete(tid, localStorage.getItem("_tkn"))
    const todos = await USER.getUserTodos(localStorage.getItem("_tkn"));
    dispatch({
      type: "USER_TODOS",
      payload: [...todos.todos]
    });
  }

  const deleteTodo= async(e, tid, dispatch)=>{
    // e.preventDefault();
    alert("Delete caled"+ tid);
    await USER.deleteToDo(tid, localStorage.getItem("_tkn"))
    const todos = await USER.getUserTodos(localStorage.getItem("_tkn"));
    dispatch({
      type: "USER_TODOS",
      payload: [...todos.todos]
    });
}

const TaskCard = ({task, updateToDo }) => {
    const dispatch = useDispatch();
    return(
        <Container style={{textAlign:"center",boxShadow:"5px 5px 5px 5px pink",marginTop:"20px",padding:"20px",borderRadius:"8px",color:"white",backgroundColor:"lightblue"}}>
            <Row>
                <Col>{task.favorite? <StarFill onClick={e => toggleFavorite(e,task._id, dispatch)} size={23} />: <Star size={23} onClick={e=> toggleFavorite(e,task._id, dispatch)}/>}</Col>
                <Col>
                    <Pencil size={23} onClick={ e => updateToDo(task)} />
                </Col>
                <Col>
                    <XCircle size={23} onClick={ e => deleteTodo(e, task._id, dispatch) }/>
                </Col>
            </Row>
            <Row>
                {/* <Col>
                    <Form.Check type="checkbox" checked={task.complete} onClick={e => toggleComplete(e, task._id, dispatch) }/>
                </Col> */}
                <Col>
                    {task.complete?<del>{task.task}</del> : task.task }
                </Col>
                
            </Row>
            <Row>
                Status : 
                {task.status? task.status:  "todo"}
                    
            </Row>
        </Container>
       
    )
}

export default TaskCard;