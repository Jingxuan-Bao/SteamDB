import React from 'react';
import Navigation from '../components/SearchBar';
import "./MainPage.css";
import { gameSearch, tenrandomgame } from '../fetcher';

class RandomGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img class="randomgame-image"src = {this.props.figure}></img>
        )
    }
}

class MainPage extends React.Component {
    componentDidMount() {
        tenrandomgame().then(res => {
            if(res.status && res.status === "success") {
                console.log("get ten random game");
                this.setState({randomtengame: res.results})
                console.log("get ten random game as " + this.state.randomtengame);
                console.log("check first game " + this.state.randomtengame[0].figure);
            }
        })
    }

    constructor(props) {
        super(props);
    
        this.state = {
            username: localStorage.getItem("userid"),
            sortgenre: '',
            gamename: '',
            appid: '',
            searchmessage: '',
            randomtengame: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.searchGame = this.searchGame.bind(this);
    }

    handleChange(event) {
        this.setState({gamename: event.target.value});
        console.log("check game name update " + this.state.gamename);
    }

    async handleGenreChange(event) {
        await this.setState({sortgenre: event.target.value});
        console.log("check game type update " + this.state.sortgenre);
    }

    searchGame(event) {
        console.log("search game start on " + this.state.gamename);
        gameSearch(this.state.gamename).then(res => {
            if(res.status) {
                if(res.status === "success" && res.results.length > 0) {
                    console.log("find app id " + res.results[0].app_id);
                    console.log("find app name " + res.results[0].name);
                    this.setState({appid: res.results[0].app_id});
                    this.props.history.push(`/game-info/${this.state.appid}`);
                }
                else {
                    this.setState({searchmessage: res.status});
                }
                return;
            }
            this.setState({searchmessage: 'error'});
        })
    }

    render() {
        return (
            <div className='main-page'>
                <div>
                    <Navigation history={this.props.history}/>
                </div>
                <div class="search-bar">
                    <input id="search" type="text" placeholder="search" onChange={this.handleChange}></input>
                    <button id="searchBtn" class="btn steam-search-btn" type="submit" onClick={this.searchGame}></button>
                </div>
                <div>
                    <div class="seach-genre-list">
                        <button class="genre-button" onClick={this.handleGenreChange} value='Action'>Action</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Strategy'>Strategy</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Adventure'>Adventure</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Indie'>Indie</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='RPG'>RPG</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Casual'>Casual</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Simulation'>Simulation</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Racing'>Racing</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Violent'>Violent</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Sports'>Sports</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Nudity'>Nudity</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Education'>Education</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Accounting'>Accounting</button>
                        <button class="genre-button" onClick={this.handleGenreChange} value='Documentary'>Documentary</button>
                    </div>
                </div>
                <div class="discount-game">
                    <div class="randomgame-list">
                        <div class="randomgame">
                            {
                                this.state.randomtengame.map((object) => {
                                    return <RandomGame figure = {object.figure} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default MainPage;