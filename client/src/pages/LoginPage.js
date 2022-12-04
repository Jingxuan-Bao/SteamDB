import React from 'react';
import './LoginPage.css';
import { getPassword } from '../fetcher'


class LoginPage extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            password: '',
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.postLogin = this.postLogin.bind(this);

    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    setPassword(event) {
        this.setState({password: event.target.value});
    }

    postLogin() {
        console.log("username " + this.state.username);
        getPassword(this.state.username).then(res => {
            if(res.status) {
                if(res.status === "success") {
                    if(this.state.password) {
                        localStorage.setItem("userid", this.state.username);
                        this.props.history.push("/main");
                        return;
                    }
                }
            }
            this.setState({message: 'error'});
        })
    }

    render() {
        return (
            <div class="auth-container">
                <div class="auth-card">
                    <img class="steam-img" src="https://steamstore-a.akamaihd.net/public/shared/images/header/globalheader_logo.png"/>
                    <input className='input' placeholder='userid' onChange={this.handleChange}></input>
                    <input className='input' placeholder='passowrd' type='password' onChange={this.setPassword}></input>
                    <div>
                    <button className='button' onClick={this.postLogin}>Login</button>
                    </div>
                    <p className='alert-message'>{this.state.message}</p>
                </div>
            </div>
        )
    }
}

export default LoginPage;