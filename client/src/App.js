import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <Route exact path="/main" component={MainPage}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App;
