import React, { Component } from 'react';

import Button from 'ohaco_components/dist/atoms/Button';
import Header from 'ohaco_components/dist/organisms/Header';
import Plus from 'ohaco_components/dist/atoms/Icon/Plus';
import Cross from 'ohaco_components/dist/atoms/Icon/Cross';
import ChevronRight from 'ohaco_components/dist/atoms/Icon/ChevronRight';
import Color from 'ohaco_components/dist/Color/className';
import Paper from 'ohaco_components/dist/atoms/Paper';
import Fixed from 'ohaco_components/dist/atoms/Fixed';
import TextField from 'ohaco_components/dist/atoms/TextField';
import TextArea from 'ohaco_components/dist/atoms/TextArea';
import Select from 'ohaco_components/dist/atoms/Select';
import Collapse from '@material-ui/core/Collapse';

import './style.css';

class EventCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privacy: 'all',
            endDateOpen: true
        }

        this.event_info = {
            event_name : "",
            start_date : "",
            end_date : "",
            shop_id : "",
            comment : "",
            hiding : "",                     
        }    
    }

    /**
     * タグ生成
     */
    createTagList() {
        let _tag = this.props.tag,
            _elem = [];

        if(_tag.length > 0) {
            for (let i = 0; i < _tag.length; i++) {
                _elem.push(
                    <span key={i} className={'p-event-create__form__tag__item ' + Color.text.primary}>#{_tag[i].name}</span>
                );
            }
        } else {
            _elem.push(<span>タグを追加してください！</span>)
        }

        return (
            _elem
        );
    }

    handleChangePrivacy = (value) => {
        console.log(value)
        this.setState({
            privacy: value
        });
    }

    setPropsState(){
        var info = {};

        info.event_name = document.getElementById("event_name").value;
        info.start_date = document.getElementById("start_date").value
        info.end_date = document.getElementById("end_date").value
        info.shop_id = document.getElementById("shop_id").value;
        info.comment = document.getElementById("comment").value;
        info.hiding = document.getElementById("hiding").value;
        //info.tag = this.props.tag;
        //info.member_id = window.localStorage.getItem("userId");
        //info.memeber_name = window.localStorage.getItem("userName");
        
        this.props.onChangeState(info)
    }

    render() {
        return (
            <div className="p-event-create">
                {/* 見出し */}
                <Header
                    textAlign="center"
                    left
                    right={
                        <Button variant="textOnly" onClick={this.props.pageBack} >
                            <Cross />
                        </Button>}
                >
                    イベントの作成
                </Header>

                {/* フォーム */}
                <Paper className="p-event-create__form">
                    <dl className="p-event-create__form__list">
                        <dt className="p-event-create__form__list__title">イベント名</dt>
                        <dd className="p-event-create__form__list__field">
                            <TextField full id="event_name" defaultValue={this.props.event_info.event_name}  onChange={this.props.onChangeState}/>
                        </dd>
                        <dt className="p-event-create__form__list__title">開催日時</dt>
                        <dd className="p-event-create__form__list__field">
                            <TextField full placeholder="yyyy/mm/dd hh:mm" id="start_date"  defaultValue={this.props.event_info.start_date} onChange={this.props.onChangeState}/>
                            {(this.state.endDateOpen) ? null:
                                <div className="p-event-create__form__open-end-date">
                                    <Button
                                        variant="textOnly"
                                        onClick={() => { this.setState({ endDateOpen: true })}}
                                        rightIcon={<Plus size="small"/>}
                                    >終了時間の設定 </Button>
                                </div>
                            }
                        </dd>
                        <Collapse in={this.state.endDateOpen}>
                            <dt className="p-event-create__form__list__title">終了日時</dt>
                            <dd className="p-event-create__form__list__field">
                                <TextField full placeholder="yyyy/mm/dd hh:mm"  id="end_date"  defaultValue={this.props.event_info.end_date}  onChange={this.props.onChangeState}/>
                            </dd>
                        </Collapse>
                        <dt className="p-event-create__form__list__title">場所</dt>
                        <dd className="p-event-create__form__list__field">
                            <Select full options={this.props.place}  id="shop_id"  selectValue={this.props.event_info.shop_id}  onChange={this.props.onChangeState}/>
                            {/* <div className="p-event-create__form__map">
                                <div className={'p-event-create__form__map__dummy ' + Color.bg.body}>
                                    <img
                                        className="p-event-create__form__map__dummy__marker"
                                        src={require('./images/icon_marker.png')}
                                        alt="マーカーピンのイメージ"
                                    />
                                </div>
                            </div> */}
                        </dd>
                        <dt className="p-event-create__form__list__title">イベントの説明</dt>
                        <dd className="p-event-create__form__list__field">
                            <TextArea full rows={3} id="comment" defaultValue={this.props.event_info.comment}  onChange={this.props.onChangeState}/>
                        </dd>
                        <dt className="p-event-create__form__list__title">タグ</dt>
                        <dd className="p-event-create__form__list__field">
                            <div className={'p-event-create__form__tag ' + Color.border.black + ' ' + Color.bg.body}>
                                {(this.props.tag.length > 0 ) ? this.createTagList() : null}
                            </div>
                            <div className="p-event-create__form__tag__edit">
                                <Button
                                    variant="textOnly"
                                    onClick={this.props.showEditTag}
                                    rightIcon={<ChevronRight size="small" />}
                                >タグ編集 </Button>
                            </div>
                        </dd>
                        <dt className="p-event-create__form__list__title">公開範囲</dt>
                        <dd className="p-event-create__form__list__field">
                            <Select full options={[
                                { value: 'all', label: '全体' },
                                { value: 'friend', label: '友達限定' },
                                { value: 'lock', label: '非公開' },
                            ]} id="hiding" selectValue={this.props.event_info.hiding}  onChange={this.props.onChangeState} onClick={this.props.onChangeState}/>
                        </dd>
                        <Collapse in={(this.state.privacy === false)}>
                            <dt className="p-event-create__form__list__title">公開トーク</dt>
                            <dd className="p-event-create__form__list__field">
                                <Select full options={[
                                    { value: '', label: '未設定' },
                                    { value: 'ウエッサイだけ', label: 'ウエッサイだけ' },
                                    { value: 'ウエッサイだけ2', label: 'ウエッサイだけ2' },
                                    { value: 'ウエッサイだけ3', label: 'ウエッサイだけ3' },
                                ]} />
                            </dd>
                        </Collapse>
                    </dl>
                </Paper>

                {/* submitボタン */}
                <Fixed
                    className="p-event-create__form__submit"
                    position="bottom"
                    direction="center"
                >
                    <Button
                        className="p-event-create__form__submit__button"
                        full
                        variant="fill"
                        theme="primary"
                        size="large"
                        onClick={this.props.submit}
                    >
                        イベントを作成する
                    </Button>
                </Fixed>
            </div>
        );
    }
}

export default EventCreate;