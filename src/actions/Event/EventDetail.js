import React, { Component } from 'react';
import Api from '../../Api';

// pages
import Page from '../../components/pages/EventDetail';

/*
const dummy = [
    { date: '2020-02-18', start_time: '15:00', end_time: '20:00', title: 'イベントタイトルイベントタイトルイベントタイトル', store: 'カラオケの鉄人 池袋東口サンシャイン通り店', address: '東京都新宿区歌舞伎町1-18-3', talk: [{ name: 'トーク', src: require('../../components/pages/images/img_dummy2@100x100.jpg') }],  tag: typeof window.localStorage.getItem('tag') !== 'undefined' && window.localStorage.getItem('tag') !== null ? JSON.parse(window.localStorage.getItem('tag')) : [], leader: [{ name: 'アイ', src: require('../../components/pages/images/badge_001.png') }], entry: [ { name: 'ア', src: require('../../components/pages/images/badge_001.png') }, { name: 'イ', src: require('../../components/pages/images/badge_002.png') }, { name: 'ウ', src: require('../../components/pages/images/badge_003.png') }, { name: 'エ', src: require('../../components/pages/images/badge_001.png') } ], explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。', today: true, open: false, interest: 0, isOwner: true, dispReminder: true },
    { date: '2020-02-20', start_time: '18:00', end_time: '20:00', title: 'クリスマスアイマス祭りカラオケバトル', store: 'カラオケの鉄人 池袋東口サンシャイン通り店', address: '東京都豊島区東池袋1-21-13', talk: [{ name: 'トーク', src: require('../../components/pages/images/img_dummy2@100x100.jpg') }],  tag: typeof window.localStorage.getItem('tag') !== 'undefined' && window.localStorage.getItem('tag') !== null ? JSON.parse(window.localStorage.getItem('tag')) : [], leader: [{ name: 'アイ', src: require('../../components/pages/images/badge_001.png') }], entry: [ { name: 'ア', src: require('../../components/pages/images/badge_001.png') }, { name: 'イ', src: require('../../components/pages/images/badge_002.png') }, { name: 'ウ', src: require('../../components/pages/images/badge_003.png') }, { name: 'エ', src: require('../../components/pages/images/badge_001.png') } ], explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。', today: false, open: false, interest: 5, isOwner: false }
];
*/

const user_id = window.localStorage.getItem("userId");
const user_name = window.localStorage.getItem("name");

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite : false,
            event_info : {},
            member_info : {},
            interest_list : {},
            is_open : false
        };
        
        //this.state.event = dummy[Math.round(Math.random())];
        
        Api.getEventInfo(this.props.event_id, this.setEventInfo);    

    }

    setFavorite=(member_id, interest_list)=>{  
        for(var i = 0; i < interest_list.length; i++){
            if(member_id === interest_list[0].member_id){
                return true;
            }            
        }
        return false;
    }

    setEventInfo=(e)=>{
        var is_favorite = this.setFavorite(user_id, e.interest_list);

        this.setState({
            favorite : is_favorite,
            event_info : e.event_info,            
            member_info : e.member_info,
            interest_list : e.interest_list,
            is_open : true
        })

    }

    /*
    // 表示確認用にイベントデータランダムでセット
    // TODO:API組み込み時に消す
    static getDerivedStateFromProps(props, state) {
        if (props.open) {
            return {
                event: dummy[Math.round(Math.random())]
            };
        } else {
            return null;
        }
    }
    */

    /**
     * 「編集する」をクリック
     */
    onEdit = (event_info) => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventCreate', event_info);
        }
    }

    /**
     * 「招待する」をクリック
     */
    onInvite = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventInviteMember', this.state.event_info.event_id);
        }
    }

    /**
     * 「参加する」をクリック
     */
    onJoin = () => {
        var setInfo = [
            {
                event_id : this.state.event_info.event_id,
                member_id : user_id,
                member_name : user_name
            }
        ];

        Api.enterEvent(setInfo, (e)=>{this.props.hideEventDetail()});
    }

    /**
     * 「興味あり」をクリック
     */
    onFavorite = () => {
        Api.setNiceEntry(this.state.event_info.event_id, user_id, user_name, (e)=>{this.setState({favorite : e.favorite})});
    }

    render() {   
        return(
            <Page
                is_open={this.state.is_open}
                open={this.props.open}
                event={this.state.event_info}
                interest_list={this.state.interest_list}
                member={this.state.member_info}
                hideEventDetail={this.props.hideEventDetail}
                onEdit={this.onEdit}
                onInvite={this.onInvite}
                onJoin={this.onJoin}
                onFavorite={this.onFavorite}
                favorite={this.state.favorite}
            />
        )
    }
}

export default EventDetail;