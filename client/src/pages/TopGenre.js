import React from 'react';
import {topgamebygenre} from '../fetcher';
import './TopList.css';
import { withRouter } from "react-router-dom";

const TopListbyGenre = ({history, genre}) => {
    // Use the useState hook to store the fetched data in state
    const [genreItems, setGenreItems] = React.useState([]);
    React.useEffect(() => {
        console.log("check genre " + genre);
        topgamebygenre(genre).then(res => {
            if (res.status && res.status === 'success') {
                res.results = res.results.slice(0, 10);
                setGenreItems(res.results);
                console.log("check genre " + genre);
            }
        });
    }, [genre]);

    function handleImageClick(item) {
        // Use the history object to navigate to the game page by its ID
        history.push(`/game-info/${item.app_id}`);
    }

    const genreItemsList = genreItems.map(item => (
        <li key={item.app_id}>
            <p className="topgame-name">{item.name}</p>
            <img className="topgame-image" src={item.figure
            } alt="" onClick={() => handleImageClick(item)} />
            <p className="topgame-rating">Rating: {item.positive_ratings}</p>
            <p className="topgame-genre">Tags: {item.genre}</p>
        </li>
    ));

    return (
        <div className="top-list">
            <div className="top-rating">
                <h1>Top game by genre</h1>
                <h1>{genre}</h1>
                <ul>
                    {genreItemsList}
                </ul>
            </div>
        </div>
    );
};

export default withRouter(TopListbyGenre);


/*
Then, pass the desired genre as a prop to the `TopListbyGenre` component when it is rendered:

```<TopListbyGenre genre="Action" />```

This will fetch the top games for the specified genre and display them on the page.*/