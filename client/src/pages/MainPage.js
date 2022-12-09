import React from 'react';
import { Button } from 'antd';
class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("userid")
        };

    }

    render() {
        return (
            <h1 style={{ color: 'white' }}>
                This is , {this.state.username}
                <br />
                <Button type="primary" onClick={() => this.props.history.push("/game-info/10")} >Go To Game Info {'>'}</Button>
            </h1>
        )
    }
}


export default MainPage;