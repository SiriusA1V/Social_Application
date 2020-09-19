import React, { Component } from 'react';

// atom
import Heading from 'ohaco_components/dist/atoms/Heading';
import Divider from 'ohaco_components/dist/atoms/Divider';
// molecules
import LineCard from '../../molecules/LineCardEvent';
// organisms
import Header from 'ohaco_components/dist/organisms/Header';
import HeaderMenu from 'ohaco_components/dist/organisms/HeaderMenu';

import DateUtil from '../../util/DateUtil';
import EventDetail from '../../../actions/Event/EventDetail';

import './style.css';

class EventTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event_modal : false,
            value : ""
        }
    }

    showEventDetail = (event_id) => {
        this.setState({
            event_modal: true,
            value : event_id
        });
    }

    hideEventDetail() {
        this.setState({
            event_modal: false
        });
        this.props.reSetList();
    }

    /**
     * 参加予定のイベント
     */
    createReservationEvent() {
        let _list = this.props.userEvent;
        return (
            <div className="p-event-top__contents__reservation-event">
                <Heading className="p-event-top__contents__reservation-event__title">参加予定のイベント</Heading>
                <Divider/>
                <div>
                    {this.createEventList(_list)}
                </div>
            </div>
        )
    }

    /**
     * 参加トークのイベント
     */
    createGroupEvent() {
        let _list = this.props.friendEvent;
        return (
            <div className="p-event-top__contents__group-event">
                <Heading className="p-event-top__contents__group-event__title">参加してない友達のイベント</Heading>
                <Divider/>
                <div>
                    {this.createEventList(_list)}
                </div>
            </div>
        )
    }

    /**
     * listのラインカードを生成
     * @param {*} list
     */
    createEventList(list) {
        let _elem = [];

        if (!Array.isArray(list) ||list.length <= 0) return null;

        for (let i = 0; i < list.length; i++) {
            //let _date = DateUtil.splitDate(list[i].date);            
            let _start_date = (""+list[i].start_date).substr(0,4) + "-" + parseInt((""+list[i].start_date).substr(4,2)) + "-" + parseInt((""+list[i].start_date).substr(6,2));
            let _now = new Date();
            let _date = DateUtil.splitDate(_start_date);

            _elem.push(
                <div
                    key={'p-event-top__contents__list--' + i}
                    className="p-event-top__contents__list"
                >
                    <LineCard
                        date={_date}
                        start_time={(""+list[i].start_date).substr(8,2) + ":" + (""+list[i].start_date).substr(10,2)}
                        today={_start_date === _now.getFullYear() + "-" + (_now.getMonth()+1) + "-" + _now.getDate() ? true : false}
                        open={list[i].hiding === "all" ? true : false}
                        title={list[i].event_name}
                        store={list[i].shop_name}
                        onClick={() => this.onClick(i, list)}
                    />
                </div>
            );
        }

        return (_elem);
    }

    /**
     * LineCardをクリックして場合
     * @param {*} i
     * @param {*} list
     */
    onClick(i, list) {
        let click_item = list[i];

        this.showEventDetail(click_item.event_id)
    }

    render() {
        // ユーザー参加予定のイベント
        let _userEvent = this.props.userEvent;
        let _groupEvent = this.props.friendEvent;
        let _eventList = this.props.eventList;

        if(!this.props.is_show){
            return(
                <div className="p-event-top">
                    <Header
                        sticky
                        left
                        right={<HeaderMenu title="menu" menuList={this.props.menu} />}
                        textAlign="center"
                    >
                        イベント
                    </Header>
                </div>
            )
        }

        return(
            <div className="p-event-top">
                <Header
                    sticky
                    left
                    right={<HeaderMenu title="menu" menuList={this.props.menu} />}
                    textAlign="center"
                >
                    イベント
                </Header>
                <div className="p-event-top__contents">
                    {/* ユーザー参加予定がある場合 */}
                    {(_userEvent.length !== 0) ? this.createReservationEvent() : null}

                    {/* トーク参加予定がある場合 -> 友達が主催するイベント*/}
                    {(_groupEvent.length !== 0) ? this.createGroupEvent() : null}

                    {/* 最新のイベントリスト */}
                    <div className="p-event-top__contents__event-list">
                        <Heading className="p-event-top__contents__event-list__title">最新のイベント</Heading>
                        <Divider/>
                        <div>
                            {this.createEventList(_eventList)}
                        </div>
                    </div>
                </div>
                {/* イベント詳細のModal */}
                {this.state.event_modal ? 
                    <EventDetail
                        open={this.state.event_modal}
                        hideEventDetail={() => this.hideEventDetail()}
                        changePage={this.props.changePage}
                        event_id={this.state.value}
                    /> 
                    : 
                    null
                }
            </div>
        )
    }
}

export default EventTop;