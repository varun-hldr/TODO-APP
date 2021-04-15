import React, {useState} from 'react';
import { Form } from "react-bootstrap";

const ToDoForm = ({ onSubmit, eTask, group, handleTaskChange, handleStatus }) => {
    return (
      <Form onSubmit={onSubmit}>
        <Form.Control
          type="text"
          placeholder="What you want to complete?"
          value={eTask.task}
          onChange={(e) => handleTaskChange(e.target.value)}
        />
        {eTask._id?
          <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" onChange={handleStatus} defaultValue={eTask.status}>
            <option value="todo">To Do</option>
            <option value="ongoing">In Progeress</option>
            <option value="done">Done</option>
          </Form.Control>
        </Form.Group>:undefined
        }
        <Form.Control
          type="text"
          placeholder="Type Group"
          value={group}
          type="hidden"
        />
      </Form>
    );
  };

  export default ToDoForm;