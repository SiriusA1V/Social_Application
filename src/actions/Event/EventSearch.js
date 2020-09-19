import React, { Component } from 'react';
import Page from '../../components/pages/EventSearch';
import Api from '../../Api';

const HISTORY_STRAGE_KEY = 'eventSearchHistory',
    MAX_HISTORY_COUNT = 10;

class EventSearch extends Component {
    constructor(props) {
        super(props);
        // とりあえずのダミーデータ
        this.state = {
            keyword: '',
            result: []
        };

        // 検索履歴をセットする
        let _history = JSON.parse(window.localStorage.getItem(HISTORY_STRAGE_KEY));
        this.state.history = (Array.isArray(_history)) ? _history : [];
    }

    setResult = (e) =>{
        
        e.sort((a,b)=>{ return a.start_date > b.start_date ? 1 : (a.start_date < b.start_date ? -1 : 0) });
        
        this.setState({
            result : e
        })
    }

    /**
     * 前の画面に戻る
     */
    pageBack = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage();
        }
    }

    /**
     * 検索結果を表示する
     */
    showResult = (keyword) => {
        // ダミーデータを定義
        /*
        let _result = [
            {
                date: '2020-02-01',
                start_time: '16:00',
                end_time: '18:00',
                title: '恵比寿イベント恵比寿イベント',
                store: 'カラオケの鉄人 恵比寿駅前店',
                address: '東京都渋谷区恵比寿1-8-4',
                leader: [{ name: 'アイ', src: require('../../components/pages/images/badge_001.png') }],
                entry: [
                    { name: 'ア', src: require('../../components/pages/images/badge_001.png') },
                    { name: 'イ', src: require('../../components/pages/images/badge_002.png') },
                    { name: 'ウ', src: require('../../components/pages/images/badge_003.png') },
                    { name: 'エ', src: require('../../components/pages/images/badge_002.png') },
                    { name: 'イ', src: require('../../components/pages/images/badge_002.png') },
                    { name: 'ウ', src: require('../../components/pages/images/badge_003.png') },
                    { name: 'エ', src: require('../../components/pages/images/badge_002.png') }
                ],
                explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。',
                today: false,
                open: false,
                interest: 2
            },
            {
                date: '2020-12-25',
                start_time: '18:00',
                end_time: '20:00',
                title: 'クリスマスアイマス祭りカラオケバトル',
                store: 'カラオケの鉄人 池袋東口サンシャイン通り店',
                address: '東京都豊島区東池袋1-21-13',
                group: [{ name: 'グループ', src: require('../../components/pages/images/img_dummy2@100x100.jpg') }],
                leader: [{ name: 'アイ', src: require('../../components/pages/images/badge_001.png') }],
                entry: [
                    { name: 'ア', src: require('../../components/pages/images/badge_001.png') },
                    { name: 'イ', src: require('../../components/pages/images/badge_002.png') },
                ],
                explan: 'イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。イベント説明が入ります。',
                today: false,
                open: false,
                interest: 5
            },
        ];
        */

        // 日付情報を表示用に加工する
        //this.setDate(_result);

        // ダミーをセット
        
        Api.getSearchEvent(window.localStorage.getItem("userId"), keyword, "9999999999990000", this.setResult)
    }

    /**
     * 履歴を表示する
     */
    showHistory = () => {
        this.setState({ result: [] });
    }

    setDate(setlist) {
        // 今日の日付
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = yyyy + '-' + mm + '-' + dd;

        setlist.map((item) => {
            if (item.date !== null) {
                if (today === item.date) {
                    item.today = true;
                }
                return item;
            }
            return null;
        });
    }

    /**
     * 履歴を選択する
     */
    selectHistoryItem = (keyword) => {
        this.setState({
            keyword: keyword
        });

        this.showResult(keyword);
    }

    /**
     * イベント詳細を表示
     */
    showEventDetail = (e) => {
        if (typeof this.props.showEventDetail === 'function') {
            this.props.showEventDetail(e);
        }

        this.saveSearchHistory();
    }

    /**
     * form キーワード変更
     */
    handleChangeKeyword = (keyword) => {
        this.setState({
            keyword: keyword
        });

        this.showResult(keyword);
    }

    /**
     * form キーワードをクリアする
     */
    clearKeyword = () => {
        this.setState({
            keyword: ''
        });

        this.showHistory();
    }

    /**
     * Enterキー入力時のハンドラー
     */
    handleEnter = (key) => {
        if (key.which === 13) {
            if (this.state.keyword) {
                this.saveSearchHistory();
            }
        }
    }

    /**
     * 検索履歴に保存する
     */
    saveSearchHistory = () => {
        let _history = window.localStorage.getItem(HISTORY_STRAGE_KEY);
        if (_history) _history = JSON.parse(_history);
        else _history = [];

        // 過去に同じキーワードで検索しているものは省く
        let hit;
        _history = _history.filter(k => {
            if (k === this.state.keyword) {
                hit = k;
                return false;
            } else {
                return k;
            }
        });

        // 先頭に追加
        if (hit) _history.unshift(hit);
        else _history.unshift(this.state.keyword);

        // 上限を超えている場合、古いものをカットする
        if (MAX_HISTORY_COUNT <= _history.length) {
            _history = _history.slice(0, MAX_HISTORY_COUNT);
        }

        window.localStorage.setItem(HISTORY_STRAGE_KEY, JSON.stringify(_history));

        this.setState({
            history: _history
        });
    }

    /**
     * 検索履歴を削除する
     */
    deleteSearchHistory = () => {
        window.localStorage.removeItem(HISTORY_STRAGE_KEY);

        this.setState({
            history: []
        });
    }

    render() {
        return (
            <Page
                history={this.state.history}
                result={this.state.result}
                keyword={this.state.keyword}
                showResult={this.showResult}
                showHistory={this.showHistory}
                pageBack={this.pageBack}
                showEventDetail={this.showEventDetail}
                selectHistoryItem={this.selectHistoryItem}
                onChangeKeyword={this.handleChangeKeyword}
                onClearKeyword={this.clearKeyword}
                onKeyPress={this.handleEnter}
                deleteSearchHistory={this.deleteSearchHistory}
                EventDetail={this.props.EventDetail}
            />
        )
    }
}

export default EventSearch;