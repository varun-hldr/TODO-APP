import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as USER from "../api/apiActions.js";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Login extends Component {
  state = {
    user: {},
    text: "Login to manage your account",
  };

 

  login = async () => {
    const { token, user, message, error  } = await USER.login(this.state.user);
    if (user) {
      this.props.dispatch({
        type: "AUTH_LOGIN",
        payload: { token, user },
      });
      localStorage.setItem("user", user);
      localStorage.setItem("_tkn", token);
      alert(message);
      this.props.history.push("/dash");
    } else {
      this.setState({
        text: message,
      });
      alert(error);
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      text: "Login to manage your account",
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    if (localStorage.getItem("user")) {
      return <Redirect to="/dash" />;
    }
    return (
        <Container style={{margin:"100px",boxShadow:"5px 5px 5px 5px",padding:"20px",minWidth:"300px",maxWidth:"900px"}}>
        <Row > 
            <Col  md={{span:12}} style={{display:"flex",flexWrap:"wrap"}}>
            <div className="item"  >
                <img src="Images/loginside.png" alt="" style={{width:"400px",borderRadius:"20px 0px 0px 20px"}}/>
            </div>
            <div className="item" style={{marginLeft:"100px"}} >
            <form>
            <img className="logo" src="Images/logo.png" alt="logo" />
              <h1>Hello,</h1>
              <h1>Welcome Back</h1>
              {/* <span className="badge bg-dark mt-4">{}</span> */}
              <div className="form-group">
                <label>{this.state.text}</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.onChange}
                />

                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                />
              </div>
              <div className="forgot">
                <Link to="/account/reset">Forgot your password?</Link>
              </div>

              <div className="login-button">
                <button onClick={this.login} type="button" style={{backgroundColor:"#51AF2B",width:"350px",border:"#51AF2B",color:"white"}}>
                  Login
                </button>
              </div>
              <div className="checkbox">
                <label>
                  Don't have an account? <Link to="/signup">Signup</Link>
                </label>
              </div>
            </form>
            </div>

            </Col>
        </Row>
    </Container> 
     
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Login);