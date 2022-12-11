import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { getowngame, userrecommend, gamerecommend } from '../fetcher'
import { Carousel, message, Alert } from 'antd';
import 'antd/dist/antd.min.css'

const ProfilePage = (props) => {
    const [owngame, setOwnGame] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [user, setUsers] = useState([]);

    const id = props.match.params.id;

    const handleOwnGame = async () => {
        const result = await getowngame(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        if (result.results?.length === 0) {
            message.info('no found recommended game!');
        }
        setOwnGame(result.results);
    }
    const handleUserRecommend = async () => {
        const result = await userrecommend(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        if (result.results?.length === 0) {
            message.info('no recommended user!');
        }
        setUsers(result.results);
    }

    const handleGameRecommend = async () => {
        const result = await gamerecommend(id);
        if (result.status !== "success") {
            message.error('request error!');
            return;
        }
        if (result.results?.length === 0) {
            message.info('no found recommended game!');
        }
        setRecommends(result.results);
    }

    useEffect(() => {
        handleOwnGame();
        handleUserRecommend();
        handleGameRecommend();
    }, [id])

    return <div class="game-container">
        <div class="bread-crumb"><a class="can-click-bread-crumb" onClick={() => props.history.push("/main")}>Home</a> / Profile</div>
        <div class="bottom" >
                <div class="content">
                    <div class="left">
                        <div class="like-left-one">Game Owned</div>
                        <div class="carousel">
                            <Carousel autoplay>
                                {owngame.map(item => <div key={item.app_id}><div
                                    class="figure"
                                    style={{
                                        backgroundImage: `url(${item.figure})` ?? undefined,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => props.history.push(`/game-info/${item.app_id}`)}
                                /></div>)}
                            </Carousel>
                            </div>
                        <div class="like-left-one">Game Recommend</div>
                        <div class="carousel">
                            <Carousel autoplay>
                                {recommends.map(item => <div key={item.app_id}><div
                                    class="figure"
                                    style={{
                                        backgroundImage: `url(${item.figure})` ?? undefined,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => props.history.push(`/game-info/${item.app_id}`)}
                                /></div>)}
                            </Carousel>
                            </div>
                            <div class="like-left-one">User Recommend</div>
                             {
                    user.length === 0
                        ?
                        <div div class="like-left-two">no recommend user</div>
                        :
                        <div class="user">{user.map(item => <Alert style={{ marginBottom: '12px', backgroundColor: "rgb(48,61,69)", borderColor: "rgb(57,74,89)", color: "#fff" }} message={item.user_id} type="info" />)}</div>
                }
                        </div>
                    </div>

            </div>

    </div >

}

export default ProfilePage;