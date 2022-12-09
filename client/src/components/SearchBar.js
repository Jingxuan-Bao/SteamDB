import React from 'react';
import "./SearchBar.css"

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
        };

        this.navtoprofile = this.navtoprofile.bind(this);

    }

    navtoprofile(event) {
        console.log("waiting to develop profile redirect");
    }

    render() {
        return (
            <div>
                <div>
                    <nav class="searchbar-nav">
                    <a class="nav-link steam-logo" href=""><img id="steam-logo" src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" alt=""></img></a>
                    <a class="nav-link" >STORE</a>
                    <a class="nav-link" >COMMUNITY</a>
                    <a class="nav-link" >ABOUT</a>
                    <a class="nav-link" >SUPPORT</a>
                    <a class="nav-link" id='nav-button' onClick={this.navtoprofile}>PROFILE</a>
                    </nav>
                </div>
                <div>

                </div>
            </div>

        )
    }
}


export default Navigation;