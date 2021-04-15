import React, {useState} from 'react';
import TaskCard from './TaskCard';
import { PlusCircle } from 'react-bootstrap-icons';
import { Modal, Button} from "react-bootstrap";
import ToDoForm from './ToDoForm';


const GroupTasks = ({group, id, tasks, handleTask}) => {
    const [show, setShow] = useState(false);
    const handleShow = (flag) => {
        if(!flag){
            setTask({});
            setUpdate(false);
        }
        setShow(flag);
    };

    const [task, setTask] = useState({group: id, status: 'todo' });
    const [update, setUpdate] = useState(false);
    
    const handleStatus = (status) => {
        setTask({...task, status:status.target.value})
    }
    const handleTaskUpdate = (task) => {
        setTask(task);
        handleShow(true);
        setUpdate(true);
        // console.log("Current task is ", task);
    };
    const handleTaskChange=(desc)=>{
        // console.log("Task change callled", desc);
        setTask({...task, task:desc})
    }
    const header = update? "Update ToDo Details" : "Add New Todo";
    const btnAct = update? "Update To Do" : "Add ToDo";
    console.log("Going to render tasks", tasks)
    return(
        <div className="container" style={{textAlign:"center",boxShadow:"5px 5px 5px 5px", padding:"20px",borderRadius:"10px",marginTop:"50px",height:"500px"}}>
           <h2>{group}</h2>
           <button onClick={e=>handleShow(true)} ><PlusCircle/> Add New ToDo</button>
           {tasks.length > 0 ? tasks.map(task => <TaskCard key={task._id} task={task}  updateToDo={handleTaskUpdate} />): undefined}
            <Modal show={show} onHide={e=> handleShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ToDoForm eTask={task} onSubmit={handleTask} handleTaskChange={handleTaskChange} handleStatus={handleStatus}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => handleTask(e, task)} variant="secondary">{btnAct}</Button>
                </Modal.Footer>
            </Modal>
        </div>
       
    )
}

export default GroupTasks; 