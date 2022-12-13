import React from 'react';
import "./SearchBar.css";
import { withRouter } from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userid: localStorage.getItem("userid")
        };

        this.navtoprofile = this.navtoprofile.bind(this);

    }

    navtoprofile(event) {
        console.log("waiting to develop profile redirect");
        this.props.history.push(`/profile/${this.state.userid}`);
    }

    render() {
        return (
            <div>
                <div>
                    <nav class="searchbar-nav">
                    <span class="nav-link steam-logo" href=""><img id="steam-logo" src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" alt=""></img></span>
                    <span class="nav-link" >STORE</span>
                    <span class="nav-link" >COMMUNITY</span>
                    <span class="nav-link" >ABOUT</span>
                    <span class="nav-link" >SUPPORT</span>
                    <span class="nav-link" id='nav-button' onClick={this.navtoprofile}>PROFILE</span>
                    </nav>
                </div>
                <div>

                </div>
            </div>

        )
    }
}


export default Navigation;