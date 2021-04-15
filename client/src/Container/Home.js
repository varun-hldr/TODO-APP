import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Cards from '../Components/cards';
import Container from 'react-bootstrap/Container';



class Home extends Component{
    constructor(){
        super()
        this.state = {
            // 
        };
        
    }
   
    
    render(){
        return(
            <Container>
                <Jumbotron fluid style={{backgroundImage:"url(/Images/banner.png)",width:"100%",height:"300px",textAlign:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                    <h1>All Your Tasks at one Place</h1>
                    <Button variant="primary">Get Startes</Button>
                    
                </Jumbotron>
                <Cards/>
             </Container>
        )
    }
}

function mapStateToProps(state){
    console.log("==== MAp State========>",state)
    
}


export default  withRouter(connect(mapStateToProps)(Home));