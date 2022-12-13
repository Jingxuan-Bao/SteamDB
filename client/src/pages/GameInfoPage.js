import React, { useEffect, useState } from 'react';
import { getGameInfo, getGameRecommended, getGameReview } from '../fetcher'
import './GameInfoPage.css';
import { Carousel, message, Alert } from 'antd';
import 'antd/dist/antd.min.css'


const GameInfoPage = (props) => {
    const [currentGameInfo, setCurrentGameInfo] = useState({});
    const [recommendeds, setRecommendeds] = useState([]);
    const [reviews, setReviews] = useState([]);

    const id = props.match.params.id;
    const handleGetGameInfo = async () => {
        const result = await getGameInfo(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        if (result.results?.length === 0) {
            message.error('no found game!');
            return;
        }
        setCurrentGameInfo(result.results[0]);
    }
    const handleGetGameRecommended = async () => {
        const result = await getGameRecommended(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        if (result.results?.length === 0) {
            message.info('no found recommended game!');
        }
        setRecommendeds(result.results);
    }
    const handleGetGameReview = async () => {
        const result = await getGameReview(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        setReviews(result.results);
    }
    useEffect(() => {
        handleGetGameInfo();
        handleGetGameRecommended();
        handleGetGameReview();
    }, [id])

    return <div class="game-container">
        <div class="bread-crumb"><a class="can-click-bread-crumb" onClick={() => props.history.push("/main")}>Home</a> / Game</div>
        <div class="bottom" style={{ backgroundImage: `url(${currentGameInfo.background})` ?? undefined }}>
            <div class="content-father">
                <div class="content">
                    <div class="left">
                        <div class="table">
                            <div class="table-left">
                                <div class="table-item">App ID</div>
                                <div class="table-item">Name</div>
                                <div class="table-item">Release Date</div>
                                <div class="table-item">Developer</div>
                                <div class="table-item">Platforms</div>
                                <div class="table-item">Tags</div>
                                <div class="table-item">Positive Ratings</div>
                                <div class="table-item">Negative Ratings</div>
                                <div class="table-item">Average Playtime</div>
                                <div class="table-item">Price</div>
                            </div>
                            <div class="table-right">
                                <div class="table-item">{currentGameInfo.app_id ?? ''}</div>
                                <div class="table-item">{currentGameInfo.name ?? ''}</div>
                                <div class="table-item">{currentGameInfo.release_dt ?? ''}</div>
                                <div class="table-item">{currentGameInfo.developer ?? ''}</div>
                                <div class="table-item">{currentGameInfo.platform ?? ''}</div>
                                <div class="table-item">{currentGameInfo.genre ?? ''}</div>
                                <div class="table-item">{currentGameInfo.positive_ratings ?? ''}</div>
                                <div class="table-item">{currentGameInfo.negative_ratings ?? ''}</div>
                                <div class="table-item">{currentGameInfo.average_playtime ?? ''}</div>
                                <div class="table-item">{currentGameInfo.price ?? ''}</div>
                            </div>
                        </div>
                        <div class="desc">{currentGameInfo.short_description ?? ''}</div>
                    </div>
                    <div class="right">
                        <div class="figure" style={{backgroundImage: `url(${currentGameInfo.figure})` ?? undefined}} />
                        <div class="like">
                            <div class="like-left-one">DO YOU LIKE IT?</div>
                            <div class="like-left-two">ADDING THIS GAME TO THE WISHLIST</div>
                        </div>
                        <div class="like-left-one">Game Recomend</div>
                        <div class="carousel">
                            <Carousel autoplay>
                                {recommendeds.map(item => <div key={item.app_id}><div
                                    class="figure"
                                    style={{
                                        backgroundImage: `url(${item.figure})` ?? undefined,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => props.history.push(`/game-info/${item.app_id}`)}
                                /></div>)}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div class="like-left-one">Review</div>
                {
                    reviews.length === 0
                        ?
                        <div div class="like-left-two">no review</div>
                        :
                        <div class="review">{reviews.map(item => <Alert style={{ marginBottom: '12px', backgroundColor: "rgb(48,61,69)", borderColor: "rgb(57,74,89)", color: "#fff" }} message={item.review} type="info" />)}</div>
                }

            </div>

        </div>
    </div >

}


export default GameInfoPage;