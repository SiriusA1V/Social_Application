import React, { Component } from 'react';
import Page from '../../components/pages/EventEditTag';
import Api from '../../Api';

class EventEditTag extends Component {
    constructor(props) {
        super(props);

        /*
        if (this.props.value === undefined || this.props.value === null) {
            this.state = {
                tag_list: typeof localStorage.getItem('tag') !== 'undefined' && localStorage.getItem('tag') !== null ? JSON.parse(localStorage.getItem('tag')) : []
            };
        } else {
            this.state = {
                tag_list: this.props.value
            };
        }
        */

        this.state = {};

        this.changeTagSearchList = this.changeTagSearchList.bind(this);
        this.createTagSearchList = this.createTagSearchList.bind(this);
        this.addTagList = this.addTagList.bind(this);
        this.removeTags = this.removeTags.bind(this);
    }

    pageBack = () => {
        this.props.showCreate();
        
        /*
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventCreate');
        }
        */
    }

    submit = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('');
        }
    }

    changeTagSearchList(_keyword) {
        Api.getTag(_keyword, this.createTagSearchList);
    }

    createTagSearchList(_list) {
        // data をステートにセット
        this.setState({
            tag_search_list: _list
        })
    }

    // タグ追加
    addTagList(tag) {
        let tags = this.props.tag;
        tags.push(tag[0]);

        this.props.onChangeState(tags, "tag");

        /*
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventEditTag', tags);
        }
        */
    }

    /**
     * クリックしたタグを消す
     */
    removeTags(tagid) {
        let _list = this.props.tag;
        const itemToFind = _list.findIndex(function(item) {return item.id === tagid})

        if (itemToFind > -1) {
            _list.splice(itemToFind, 1);
        }

        this.props.onChangeState(_list, "tag");

        /*
        this.setState({
            tag_list: _list
        });
        */
    }

    /**
     * 編集したタグをSaveする
     */
    saveTags() {
        this.props.showCreate();
        /*
        localStorage.setItem('tag', JSON.stringify(this.props.tag));
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventCreate');
        }
        */
    }

    render() {
        return (
            <Page
                tag={this.state.tag}
                tag_list={this.props.tag}
                tag_search_list={this.state.tag_search_list}
                changeTagSearchList={this.changeTagSearchList}
                addTagList={this.addTagList}
                removeTags={this.removeTags}
                saveTags={() => this.saveTags()}
                pageBack={() => this.pageBack()}
                submit={() => this.submit()}
            />
        );
    }
}

export default EventEditTag;