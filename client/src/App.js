import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import GameInfoPage from './pages/GameInfoPage'


class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path="/main" component={MainPage} />
                        <Route exact path="/game-info/:id" component={GameInfoPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App;
