import React, { Component } from 'react';
// atom
import Button from 'ohaco_components/dist/atoms/Button';
import Divider from 'ohaco_components/dist/atoms/Divider';
import Heading from 'ohaco_components/dist/atoms/Heading';
import SearchIcon from 'ohaco_components/dist/atoms/Icon/Search';
import CrossIcon from 'ohaco_components/dist/atoms/Icon/Cross';
import LineButton from 'ohaco_components/dist/atoms/LineButton';
import Paper from 'ohaco_components/dist/atoms/Paper';
import TextField from 'ohaco_components/dist/atoms/TextField';
import Color from 'ohaco_components/dist/Color/className';
// molecules
import LineCard from '../../molecules/LineCardEvent';

import DateUtil from '../../util/DateUtil';

import './style.css';

class EventSearch extends Component {

    /**
     * 履歴のボタンを選択する
     */
    selectHistoryItem(keyword) {
        this.searchFrom.value = keyword;
        if (typeof this.props.selectHistoryItem === 'function') {
            this.props.selectHistoryItem(keyword);
        }
    }

    /**
     * キーワードをクリアする
     */
    clearKeyword() {
        this.searchFrom.value = '';

        if (typeof this.props.onClearKeyword === 'function') {
            this.props.onClearKeyword()
        }
    }

    createHistory() {
        let elem = [];
        if (Array.isArray(this.props.history)) {
            for (let i = 0; i < this.props.history.length; i++) {
                elem.push(
                    <li className="p-event-search__list-area__list__item" key={'p-event-search__list-area__list__item--' + i}>
                        <LineButton
                            onClick={() => this.selectHistoryItem(this.props.history[i])}
                        >
                            {this.props.history[i]}
                        </LineButton>
                    </li>
                );
            }

            if (elem.length) elem = <ul className="p-event-search__list-area__list">{elem}</ul>;
        }

        // TODO:historyすら無かったら、ここになにかを出す

        return (
            <Paper className="p-event-search__list-area">
                <Heading className="p-event-search__list-area__heading">検索履歴</Heading>
                <Divider />
                {elem}
                <Paper className="p-event-search__list-area__delete">
                    <Button
                        onClick={this.props.deleteSearchHistory}
                        className="p-event-search__list-area__delete__button"
                        theme="dimGray"
                        variant="textOnly"
                    >
                        履歴を削除する
                    </Button>
                </Paper>
            </Paper>
        );
    }

    createResult() {
        let elem = [];
        if (Array.isArray(this.props.result) && this.props.result.length > 0) {
            for (let i = 0; i < this.props.result.length; i++) {
                let item = this.props.result[i];

                let _start_date = (""+item.start_date).substr(0,4) + "-" + parseInt((""+item.start_date).substr(4,2)) + "-" + parseInt((""+item.start_date).substr(6,2));
                let _now = new Date();
                let _date = DateUtil.splitDate(_start_date);

                elem.push(
                    <li className="p-event-search__list-area__list__item" key={'p-event-search__list-area__list__item--' + i}>
                        <LineCard
                            date={_date}
                            start_time={(""+item.start_date).substr(8,2) + ":" + (""+item.start_date).substr(10,2)}
                            today={_start_date === _now.getFullYear() + "-" + (_now.getMonth()+1) + "-" + _now.getDate() ? true : false}
                            open={item.hiding === "all" ? true : false}
                            title={item.event_name}
                            store={item.shop_name}
                            onClick={() => this.props.showEventDetail(item.event_id)}
                        />
                    </li>
                );
            }

            if (elem.length) elem = <ul className="p-event-search__list-area__list">{elem}</ul>;
        } else {
            elem.push(
                <div className={'p-event-search__list-area__list__no-result ' + Color.bg.body} key={0}>
                    <div className="p-event-search__list-area__list__no-result__icon">
                        <SearchIcon theme="gray" />
                    </div>
                    <div className={'p-event-search__list-area__list__no-result__text ' + Color.text.dimGray}>
                        <div className="p-event-search__list-area__list__no-result__text__bold">
                            「 {this.props.keyword} 」
                        </div>
                        の検索結果が見つかりませんでした。
                    </div>
                </div>
            )
        }

        // TODO:検索結果がなかったら、なにか別のもの

        return (
            <Paper className="p-event-search__list-area">
                {elem}
            </Paper>
        );
    }

    render() {
        return (
            <div className="p-event-search">
                {/* 検索ボックス */}
                <Paper className="p-event-search__input">
                    <div className="p-event-search__input__form">
                        <TextField
                            className="p-event-search__input__form__field"
                            placeholder="イベントを探す"
                            autoFocus={true}
                            full
                            size="large"
                            leftIcon={<SearchIcon />}
                            onChange={(e) => {
                                if (0 < e.length) {
                                    if (typeof this.props.showResult === 'function') {
                                        this.props.onChangeKeyword(e);
                                    }
                                } else {
                                    if (typeof this.props.showHistory === 'function') {
                                        this.props.showHistory();
                                    }
                                    this.clearKeyword();
                                }
                            }}
                            onKeyPress={this.props.onKeyPress}
                            ref={(r) => { this.searchFrom = r }}
                        />
                        {(!this.props.keyword) ? null :
                            <Button
                                onClick={() => this.clearKeyword()}
                                className="p-event-search__input__form__clear"
                                size="small"
                                theme="dimGray"
                                variant="fill"
                                iconButton
                            >
                                <CrossIcon size="small" />
                            </Button>
                        }
                    </div>
                    <div className="p-event-search__input__cancel">
                        <Button variant="textOnly" size="small" onClick={this.props.pageBack}>キャンセル</Button>
                    </div>
                </Paper>

                {/* list-area */}
                {(this.props.keyword) ? this.createResult() : this.createHistory()}

                {/* イベント詳細のModal */}
                {this.props.EventDetail}
            </div>
        );
    }
}

export default EventSearch;