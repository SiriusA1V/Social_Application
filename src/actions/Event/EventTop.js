import React, { Component } from 'react';
import Api from '../../Api';

import PlusIcon from 'ohaco_components/dist/atoms/Icon/Plus';
import SearchIcon from 'ohaco_components/dist/atoms/Icon/Search';

import Page from '../../components/pages/EventTop';
import Wrappr from '../../components/templates/WrapperTemplate';

const userId = window.localStorage.getItem("userId");

class EventTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 参加予定のイベント

            is_user_event : false,
            is_friend_event : false,
            is_event_list : false,

            user_event : [
                /*
                {
                    date: '2020-02-19',
                    start_time: '16:00',
                    end_time: '18:00',
                    title: '恵比寿イベント恵比寿イベント',
                    store: 'カラオケの鉄人 恵比寿駅前店',
                    address: '東京都渋谷区恵比寿1-8-4',
                    talk: [{name: 'トーク', src: require('../../components/pages/images/img_dummy2@100x100.jpg')}],
                    leader: [{name: 'アイ', src: require('../../components/pages/images/badge_001.png')}],
                    entry: [
                        {name: 'ア', src: require('../../components/pages/images/badge_001.png')},
                        {name: 'イ', src: require('../../components/pages/images/badge_002.png')},
                        {name: 'ウ', src: require('../../components/pages/images/badge_003.png')},
                        {name: 'エ', src: require('../../components/pages/images/badge_001.png')}
                    ],
                    explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。',
                    today: false,
                    open: false,
                    interest: 10,
                    isOwner: true,
                    dispReminder: false
                }
                */
            ],
            // 参加トークのイベント
            friend_event : [
                /*
                {
                    date: '2020-02-20',
                    start_time: '18:00',
                    end_time: '20:00',
                    title: 'クリスマスアイマス祭りカラオケバトル',
                    store: 'カラオケの鉄人 池袋東口サンシャイン通り店',
                    address: '東京都豊島区東池袋1-21-13',
                    talk: [{name: 'トーク', src: require('../../components/pages/images/img_dummy2@100x100.jpg')}],
                    leader: [{name: 'アイ', src: require('../../components/pages/images/badge_001.png')}],
                    entry: [
                        {name: 'ア', src: require('../../components/pages/images/badge_001.png')},
                        {name: 'イ', src: require('../../components/pages/images/badge_002.png')},
                        {name: 'ウ', src: require('../../components/pages/images/badge_003.png')},
                        {name: 'エ', src: require('../../components/pages/images/badge_001.png')}
                    ],
                    explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。',
                    today: false,
                    open: false,
                    interest: 5,
                    isOwner: false
                }
                */
            ],
            // 最新のイベント
            event_list : [
                /*
                {
                    date: '2020-12-25',
                    start_time: '18:00',
                    end_time: '20:00',
                    title: 'クリスマスアイマス祭りカラオケバトル',
                    store: 'カラオケの鉄人 池袋東口サンシャイン通り店',
                    address: '東京都豊島区東池袋1-21-13',
                    talk: [{name: 'トーク', src: require('../../components/pages/images/img_dummy2@100x100.jpg')}],
                    leader: [{name: 'アイ', src: require('../../components/pages/images/badge_001.png')}],
                    entry: [
                        {name: 'ア', src: require('../../components/pages/images/badge_001.png')},
                        {name: 'イ', src: require('../../components/pages/images/badge_002.png')},
                        {name: 'ウ', src: require('../../components/pages/images/badge_003.png')},
                        {name: 'エ', src: require('../../components/pages/images/badge_001.png')}
                    ],
                    explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。',
                    today: false,
                    open: false,
                    interest: 100,
                    isOwner: false
                }
                */
            ],
            // トップメニュー
            menu : [
                {
                    label: 'イベントを探す',
                    ButtonProps: { leftIcon: <SearchIcon /> },
                    onClick: this.showEventSearch
                },
                {
                    label: 'イベントを自分で作る',
                    ButtonProps: { radiusSize: 'medium', leftIcon: <PlusIcon />, rightIcon: <PlusIcon /> },
                    onClick: this.showEventCreate
                }
            ]
        };
        
        this.setDefaultList();
    }

    setUserEvent = (idx, e) => {

        e.sort((a,b)=>{ return a.start_date > b.start_date ? 1 : (a.start_date < b.start_date ? -1 : 0) });

        this.setState({
            [idx] : e,
            ["is_"+idx] : true
        })
    }

    setDefaultList=()=>{
        Api.getEventMe(userId, this.setUserEvent);
        Api.getEventFriend(userId, this.setUserEvent);
        Api.getEventLimitAll(userId, "9999999999990000", this.setUserEvent); //後でリミット日付編集
    }

    setDate(setlist) {
        // 今日の日付
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if( dd < 10 ) { dd = '0' + dd }
        if( mm < 10 ) { mm = '0' + mm }
        today = yyyy + '-' + mm + '-' + dd;

        setlist.map((item) => {
            if(item.date !== null) {
                // TODAY フラグをセット
                if(today === item.date) {
                    item.today = true;
                }
                return item;
            }
            return null;
        });

        this.setState({});
    }

    showEventCreate = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventCreate');
        }
    }

    showEventSearch = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventSearch');
        }
    }

    render() {
        //if(this.state.user_event.length !== 0 &&&&&&&&&&&&&)
        return(
            <Wrappr>
                <Page
                    userEvent={this.state.user_event}
                    friendEvent={this.state.friend_event}
                    eventList={this.state.event_list}
                    menu={this.state.menu}
                    reSetList={this.setDefaultList}
                    changePage={this.props.changePage}
                    is_show={(this.state.is_event_list && this.state.is_friend_event && this.state.user_event) ? true : false}
                />
            </Wrappr>
        )
    }
}

export default EventTop;