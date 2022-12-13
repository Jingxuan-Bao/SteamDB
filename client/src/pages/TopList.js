import React from 'react';
import { topratinggame, topreviewgame, topgamebygenre} from '../fetcher';
import './TopList.css';
import { withRouter } from "react-router-dom";

// This is a functional component that uses the fetcher function to fetch data and render it in a list


const TopList = ({history}) => {
  // Use the useState hook to store the fetched data in state
  const [ratingItems, setRatingItems] = React.useState([]);
  const [reviewCountItems, setReviewCountItems] = React.useState([]);

  // Use the useEffect hook to trigger the fetcher functions on mount
  React.useEffect(() => {
    topratinggame().then(res => {
      if (res.status && res.status === 'success') {
        res.results = res.results.slice(0, 10);
        setRatingItems(res.results);
      }
    });

    topreviewgame().then(res => {
      if (res.status && res.status === 'success') {
        res.results = res.results.slice(0, 10);
        setReviewCountItems(res.results);
      }
    });
  }, []);

    function handleImageClick(item) {
        // Use the history object to navigate to the game page by its ID
        history.push(`/game-info/${item.app_id}`);
    }

    const ratingItemsList = ratingItems.map(item => (
        <li key={item.app_id}>
            <p className="topgame-name">{item.name}</p>
            <img className="topgame-image" src={item.figure} alt="" onClick={() => handleImageClick(item)} />
            <p className="topgame-rating">Rating: {item.positive_ratings}</p>
            <p className="topgame-genre">Tags: {item.genre}</p>
        </li>
        ));

    const reviewCountItemsList = reviewCountItems.map(item => (
        <li key={item.app_id}>
            <p className="topgame-name">{item.name}</p>
            <img className="topgame-image" src={item.figure} alt="" onClick={() => handleImageClick(item)} />
            <p className="topgame-rating">Review Count: {item.review_count}</p>
            <p className="topgame-genre">Tags: {item.genre}</p>
        </li>
    ));

  return (
    <div className="top-list">
      <div className="top-rating">
        <h1>Top Rating Game</h1>
        <ul>
          {ratingItemsList}
        </ul>
      </div>
      <div className="top-review">
        <h1>Top Review Count Game</h1>
        <ul>
          {reviewCountItemsList}
        </ul>
      </div>
    </div>
  );
};


export default withRouter(TopList);
