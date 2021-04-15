import React from 'react';


const Cards = () => {
    return(
        <div className="container" style={{textAlign:"center"}}>
           
            <div className="row" style={{display:"flex",gap:"50px",marginTop:"50px"}}>
            <div className="col" md={{span:6}} style={{boxShadow:"2px 2px 2px 2px",marginLeft:"120px",padding:"20px"}}>
                <img src="Images/todo.png" alt="" />
                    <p >
                       Don't miss any tasks which you have to complete
                    </p>
            </div>
            <div className="col" md={{span:6}} style={{boxShadow:"2px 2px 2px 2px",marginLeft:"120px",padding:"20px"}}>
                <img src="Images/todo2.png" alt="" style={{float:"left"}}/>
                    <p >
                       Trace & Add task from any device
                    </p>
            </div>
           
            </div>
        </div>
       
    )
}

export default Cards;