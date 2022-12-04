import React from 'react';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: localStorage.getItem("userid")
        };

    }

    render() {
        return (
            <h1 style={{color: 'white'}}>
                This is , {this.state.username}
            </h1>
        )
    }
}


export default MainPage;