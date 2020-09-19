import React, { Component } from 'react';

// atom
import Color from 'ohaco_components/dist/Color/className';
import TextField from 'ohaco_components/dist/atoms/TextField';
// organisms
import LineButton from 'ohaco_components/dist/atoms/LineButton';
// icon
import './style.css';
import Search from 'ohaco_components/dist/atoms/Icon/Search';
import Api from '../../../Api';

class EditTagSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : null
        }
    }

    /**
     * 入力した時
     * @param {*} e 
     */
    onChange(e) {
        if(e.length === 0) {
            e = null;
        }
        this.setState({
            keyword : e
        })
        this.props.changeTagSearchList(e);
    }

    /**
     * 追加してタグ編集ページに戻る
     */
    tagAdd(_keyword) {
        Api.getTag(_keyword,this.props.addTagList);
    }

    /**
     * 新しくタグを追加
     */
    newTagAdd(_keyword) {
        Api.registTag(_keyword, this.props.addTagList);
    }

    /**
     * 検索したタグのリスト生成
     */
    createTagList() {
        let _list = typeof this.props.tag_search_list !== 'undefined' && this.props.tag_search_list !== null ? this.props.tag_search_list : [],
            _keyword = this.state.keyword,
            _elem = [];
        if (!Array.isArray(_list) && _list.length <= 0) return null;

        // 入力した文字がない場合は何も出力しない
        if(_keyword !== "" && _keyword !== null) {
            let isCheck = false;
            // 入力しました文字とリストの中の文字を確認
            for(let check = 0; check < _list.length; check++) {
                if(_keyword === _list[check].name) {
                    isCheck = true;
                }
            }

            if(!isCheck) {
                _elem.push(
                    <LineButton
                        key="key"
                        onClick={() => this.newTagAdd(_keyword)}
                    >
                        {/* # */}
                        <span className={Color.text.accent}> #{_keyword} </span>
                    </LineButton>
                );
            }

            for (let i = 0; i < _list.length; i++) {
                let text = _list[i].name,
                    _index = -1;

                    _index = text.indexOf(_keyword);

                // 入力した文字があるのか
                if( _index !== -1 ) {
                    // 入力した文字の位置把握
                    let array_word = text.split("")

                     // 入力した文字にだけ色々付け
                    let _word = [];
                    if(array_word.length > 0) {
                        for(let j = 0; j < array_word.length; j++) {
                            // 検索した文字の位置とあって
                            if(j === _index) {
                                _word.push (<span key={j} className={Color.text.accent}>{_keyword}</span>);
                                // 一文字以上の場合は、文字の長さ分jを増やす
                                if(_keyword.length > 1) {
                                    j = _keyword.length - 1;
                                }
                            } else {
                                _word.push ( <span key={j} >{array_word[j]}</span>);
                            }
                        }
                    }
                    _elem.push(
                        <LineButton
                            key={i}
                            onClick={() => this.tagAdd(text)}
                        >
                            {/* # */}
                            <span className={Color.text.accent}>#</span>
                            <span>{_word}</span>
                        </LineButton>
                    );
                }
                else {

                }
            }
        }
        return (
            _elem
        )
    }


    /* ------------------------------------------------------------ */
    render() {
        return (
            <div className="o-event-edit-tag-search">
                <div className={'o-event-edit-tag-search__search-area ' + Color.bg.white}>
                    <TextField
                        className="o-event-edit-tag-search__search-area__textfield"
                        id="tag-search"
                        placeholder="タグを検索"
                        full
                        onChange={(e) => this.onChange(e)}
                        leftIcon={
                            <Search />
                        }
                    />
                </div>
                <div className={'o-event-edit-tag-search__result-area ' + Color.bg.white}>
                    {this.createTagList()}
                </div>
            </div>
        );
    }
}

export default EditTagSearch;
