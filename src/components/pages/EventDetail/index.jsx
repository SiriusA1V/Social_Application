import React, { Component } from 'react';

// atom
import Modal from 'ohaco_components/dist/atoms/Modal';
import Tag from 'ohaco_components/dist/atoms/Tag';
import Heading from 'ohaco_components/dist/atoms/Heading';
import Divider from 'ohaco_components/dist/atoms/Divider';
import Button from 'ohaco_components/dist/atoms/Button';
import Thumbnail from 'ohaco_components/dist/atoms/Thumbnail';
import Color from 'ohaco_components/dist/Color/className';
import FavoriteButton from '../../molecules/FavoriteButton';
// icon
import Lock from 'ohaco_components/dist/atoms/Icon/Lock';
import UserAdd from 'ohaco_components/dist/atoms/Icon/UserAdd';
import EMail from 'ohaco_components/dist/atoms/Icon/EMail';
import Reserve from 'ohaco_components/dist/atoms/Icon/Reserve';
// import Share from 'ohaco_components/dist/atoms/Icon/Share';
import Edit from 'ohaco_components/dist/atoms/Icon/Edit';

import ReservationReminder from '../../organisms/ReservationReminder';
import DateUtil from '../../util/DateUtil';

import './style.css';

const kari_photo = require('../../../components/pages/images/badge_001.png');
const user_id = window.localStorage.getItem("userId");

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminderOpen: this.props.open && this.props.event.isOwner
        };
    }

    /**
     * Event詳細Modalを閉じる
     */
    hideEventDetail() {
        if (typeof this.props.hideEventDetail === 'function') {
            this.props.hideEventDetail();
        }
    }

    /**
     * 公開・非公開Tag生成
     * @param {*} open
     */
    createOpenTag(open) {
        if (!open) {
            return (
                <Tag
                    className="p-event-detail__header__open__icon-tag"
                    size="x-small"
                    theme="gray"
                >
                    <Lock
                        className="p-event-detail__header__open__icon-tag__icon"
                        size="x-small"
                    />
                    <span className="p-event-detail__header__open__icon-tag__text">
                        非公開
                    </span>
                </Tag>
            )
        } else {
            return null;
        }
    }

    /**
     * TodayTag生成
     * @param {*} today
     */
    createTodayTag(today) {
        if (today) {
            return (
                <Tag
                    className="p-event-detail__header__today__tag"
                    size="x-small"
                    theme="primary"
                >
                    TODAY
                </Tag>
            )
        } else {
            return null;
        }
    }

    /**
     * 参加の一覧を生成
     * @param {*} list
     */
    createEntrylist(list) {
        let _elem = [],
            count = 0;

        if (!Array.isArray(list) || list.length <= 0) return null;

        if (list.length > 4) {
            count = 4;
        } else {
            count = list.length;
        }

        for (let i = 0; i < count; i++) {            
            _elem.push(
                <Thumbnail
                    key={'p-event-detail__contents__entry__list__item--' + i}
                    className="p-event-detail__contents__entry__list__item"
                    frameVariant="black"
                    src={(""+list[i].photo_url !== "undefined" && list[i].photo_url) ? list[i].photo_url : kari_photo}
                    size="small"
                />
            );
        }

        _elem.push(
            <span
                className="p-event-detail__contents__entry__list__text"
                key="p-event-detail__contents__entry__list__text"
            >
                …ほか {list.length} 人
            </span>
        );

        return (_elem);
    }

    /**
     * タグの一覧を生成
     * @param {*} list 
     */
    createTaglist(list) {
        let _elem = [];
        if (!Array.isArray(list) || list.length <= 0) return null;

        for (let i = 0; i < list.length; i++) {
            _elem.push(
                <span key={i} className={'p-event-create__form__tag__item ' + Color.text.primary}>#{list[i].tag_name_full}</span>
            );
        }

        return (_elem);
    }

    /**
     * リマインダーを表示させる
     */
    showReminder = () => {
        if (this.props.open && this.props.event.isOwner && this.props.event.dispReminder) {
            this.setState({
                reminderOpen: true
            });
        }
    }

    /**
     * リマインダーを隠す
     */
    hideReminder = () => {
        if (this.props.open && this.props.event.isOwner && this.props.event.dispReminder) {
            this.setState({
                reminderOpen: false
            });
        }
    }
    
    getLeaderInfo(member_id, member){
        for(var i = 0; i < member.length; i++){
            if(member[i].member_id === member_id){
                return member[i];
            }
        }

        return {};
    }

    isEventMember(member){
        for(var i = 0; i < member.length; i++){
            if(member[i].member_id === user_id) return false; //参加者だったら参加ボタン表示しない           
        }
        return true;
    }    

    /* ------------------------------------------------------------ */
    render() {
        let event = this.props.event;
        let member = this.props.member;
        if (event === null || typeof event === 'undefined') return false;
        let _start_date = (""+event.start_date).substr(0,4) + "-" + parseInt((""+event.start_date).substr(4,2)) + "-" + parseInt((""+event.start_date).substr(6,2));
        let _end_date = (""+event.end_date).substr(0,4) + "-" + parseInt((""+event.end_date).substr(4,2)) + "-" + parseInt((""+event.end_date).substr(6,2));
        let _now = new Date();
        
        let _date = DateUtil.splitDate(_start_date);
        let _date2 = DateUtil.splitDate(_end_date);

        let _leaderInfo = this.getLeaderInfo(event.member_id, member);


        if(!this.props.is_open){
            return(
                <Modal
                open={this.props.open}
                onClose={() => this.hideEventDetail()}
                className="p-event-detail"
                existCloseButton
                onTouchStart={this.hideReminder}
                onTouchEnd={this.showReminder}
                >💛</Modal>
            )
        }

        return (
            <Modal
                open={this.props.open}
                onClose={() => this.hideEventDetail()}
                className="p-event-detail"
                existCloseButton
                onTouchStart={this.hideReminder}
                onTouchEnd={this.showReminder}
            >
                <div className="p-event-detail__modal">
                    {/* 公開・非公開 */}
                    <div className="p-event-detail__header">
                        <span className="p-event-detail__header__month">
                            {_date.month + '/'}
                        </span>
                        <span className="p-event-detail__header__day">
                            {_date.day}
                        </span>
                        <span className="p-event-detail__header__today">
                            {'(' + _date.week + ')'}
                        </span>
                        <span className="p-event-detail__header__tag">
                            {this.createTodayTag(_start_date === _now.getFullYear() + "-" + (_now.getMonth()+1) + "-" + _now.getDate() ? true : false)}
                            {this.createOpenTag(event.hiding === "all" ? true : false)}
                        </span>
                    </div>
                    {/* タイトル */}
                    <div className="p-event-detail__title">
                        <Heading
                            variant="h1"
                            textAlign="center"
                            className="p-event-detail__title__titleText"
                        >
                            {event.event_name}
                        </Heading>
                        <Heading
                            textAlign="center"
                            className={'p-event-detail__title__subText ' + Color.text.inkBlack}
                        >
                            {event.shop_name}
                        </Heading>
                    </div>
                    <Divider />
                    {/* 参加ボタンなど */}
                    <div className="p-event-detail__contents">
                        <div className="p-event-detail__contents__active">
                            {(event.member_id === user_id) ?
                                <>
                                    <Button
                                        iconButton
                                        size="large"
                                        theme="dimGray"
                                        className="p-event-detail__contents__active__edit"
                                        onClick={()=>this.props.onEdit(event)}
                                    >
                                        <Edit
                                            size="large"
                                            theme="black"
                                            fillTheme="secondary"
                                            className="p-event-detail__contents__active__edit__icon"
                                        />
                                        <p className={'p-event-detail__contents__active__edit__text ' + Color.text.black}>編集する</p>
                                    </Button>
                                    <Button
                                        iconButton
                                        size="large"
                                        theme="dimGray"
                                        className="p-event-detail__contents__active__share"
                                        onClick={this.props.onInvite}
                                    >
                                        <EMail
                                            size="large"
                                            theme="black"
                                            fillTheme="secondary"
                                            className="p-event-detail__contents__active__share__icon"
                                        />
                                        <p className={'p-event-detail__contents__active__share__text ' + Color.text.black}>招待する</p>
                                    </Button>
                                </> :
                                <>
                                    {this.isEventMember(member) ? <Button
                                        iconButton
                                        size="large"
                                        theme="dimGray"
                                        className="p-event-detail__contents__active__entry"
                                        onClick={this.props.onJoin}
                                    >
                                        <UserAdd
                                            size="large"
                                            theme="black"
                                            fillTheme="secondary"
                                            className="p-event-detail__contents__active__entry__icon"
                                        />
                                        <p className={'p-event-detail__contents__active__entry__text ' + Color.text.black}>参加する</p>
                                    </Button>
                                    : null}
                                    <Button
                                        iconButton
                                        size="large"
                                        theme="dimGray"
                                        className="p-event-detail__contents__active__favorite"
                                        onClick={this.props.onFavorite}
                                    >
                                        <FavoriteButton
                                            isfavorite={this.props.favorite}
                                            size="large"
                                            className="p-event-detail__contents__active__favorite__icon"
                                        />
                                        <p className={'p-event-detail__contents__active__favorite__text ' + Color.text.black}>興味あり</p>
                                    </Button>

                                    {!this.isEventMember(member) ? <Button
                                        iconButton
                                        size="large"
                                        theme="dimGray"
                                        className="p-event-detail__contents__active__share"
                                        onClick={this.props.onInvite}
                                    >
                                        <EMail
                                            size="large"
                                            theme="black"
                                            fillTheme="secondary"
                                            className="p-event-detail__contents__active__share__icon"
                                        />
                                        <p className={'p-event-detail__contents__active__share__text ' + Color.text.black}>招待する</p>
                                    </Button>
                                    : null}                                    
                                </>
                            }
                        </div>
                        {/* 説明 */}
                        <div className="p-event-detail__contents__explan">
                            {event.comment}
                        </div>
                        {/* タグ */}
                        <div className="p-event-detail__contents__tag">
                            {this.createTaglist(event.tag)}
                        </div>
                        {/* 日時 */}
                        <div className="p-event-detail__contents__date">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__date__heading"
                            >
                                日時
                            </Heading>
                            <span className="p-event-detail__contents__date__text">
                                {_date.month + '/' + _date.day + '(' + _date.week + ') '}
                            </span>
                            <span className="p-event-detail__contents__date__text">
                                {(""+event.start_date).substr(8,2) + ":" + (""+event.start_date).substr(10,2) + ' ~ ' + _date2.month + '/' + _date2.day + '(' + _date2.week + ') '+(""+event.end_date).substr(8,2) + ":" + (""+event.end_date).substr(10,2)}
                            </span>
                        </div>
                        {/* 住所 */}
                        <div className="p-event-detail__contents__place">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__place__heading"
                            >
                                住所
                            </Heading>
                            <p className="p-event-detail__contents__place__text">
                                {event.address}
                            </p>
                            {/* <img
                                className="p-event-detail__contents__place__img"
                                src={require('../images/address.png')}
                                alt="address"
                            /> */}
                        </div>
                        {/* トーク */}
                        {
                            /*
                        <div className="p-event-detail__contents__group">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__group__heading"
                            >
                                トーク
                            </Heading>
                            <div className="p-event-detail__contents__group__info">
                                <Thumbnail
                                    frameVariant="black"
                                    src={event.talk[0].src}
                                    size="small"
                                />
                                <span className="p-event-detail__contents__group__info__name">{event.talk[0].name}</span>
                            </div>
                        </div>
                            */
                        }                        
                        
                        {/* 主催 */}
                        <div className="p-event-detail__contents__leader">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__leader__heading"
                            >
                                主催
                            </Heading>
                            <div className="p-event-detail__contents__leader__info">
                                <Thumbnail
                                    frameVariant="black"
                                    src={(""+_leaderInfo.photo_url !== "undefined" && _leaderInfo.photo_url) ? _leaderInfo.photo_url : kari_photo}
                                    //src={event.leader[0].src}
                                    size="small"
                                />
                                <span className="p-event-detail__contents__leader__info__name">{_leaderInfo.name}</span>
                            </div>
                        </div>
                        {/* 参加者 */}
                        <div className="p-event-detail__contents__entry">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__entry__heading"
                            >
                                参加者
                            </Heading>
                            <div className="p-event-detail__contents__entry__list">
                                {this.createEntrylist(member)}
                            </div>
                        </div>
                        {/* 興味あり */}
                        <div className="p-event-detail__contents__interest">
                            <Heading
                                variant="h4"
                                theme="dimGray"
                                className="p-event-detail__contents__interest__heading"
                            >
                                興味あり
                            </Heading>
                            <p className="p-event-detail__contents__interest__text">{this.props.interest_list.length}人</p>
                        </div>
                        <div className="p-event-detail__contents__active-button">
                            <div className="p-event-detail__contents__active-button__reserve">
                                <Button
                                    full
                                    rightIcon={
                                        <Reserve />
                                    }
                                >
                                    お店を予約する
                                </Button>
                            </div>
                            {/* <div className="p-event-detail__contents__active-button__share">
                                <Button
                                    full
                                    rightIcon={
                                        <Share />
                                    }
                                >
                                    イベントをシェアする
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* イベント作成オーナー用ポップアップ */}
                {!(this.props.open && event.isOwner && event.dispReminder) ? null :
                    <ReservationReminder
                        open={this.state.reminderOpen}
                        onTodo={() => { alert('リマインダーが非表示になります') }}
                        onAlready={() => { alert('リマインダーが2度と表示されません') }}
                        onMoveReserve={() => { alert('リマインダーが2度と表示されなくなり、Webの予約ページが表示されます') }}
                    />}
            </Modal>
        );
    }
}

export default EventDetail;
