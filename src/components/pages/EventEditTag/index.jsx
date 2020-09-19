import React, { Component } from 'react';

// atom
import Button from 'ohaco_components/dist/atoms/Button';
import Color from 'ohaco_components/dist/Color/className';
// organisms
import Header from 'ohaco_components/dist/organisms/Header';
// icon
import ChevronLeft from 'ohaco_components/dist/atoms/Icon/ChevronLeft';
import ChevronRight from 'ohaco_components/dist/atoms/Icon/ChevronRight';
import Cross from 'ohaco_components/dist/atoms/Icon/Cross';
import Plus from 'ohaco_components/dist/atoms/Icon/Plus';

// page
import EditTagSearch from '../../organisms/EditTagSearch';

import './style.css';

class EventEditTag extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * タグを生成
     */
    createTags() {
        let _list = this.props.tag_list,
            _elem = [];

        if (!Array.isArray(_list) ||_list.length <= 0) return null;

        for (let i = 0; i < _list.length; i++) {
            _elem.push(
                <Button
                    className="p-event-edit-tag__contents__choice-tag__items"
                    theme="white"
                    key={i}
                    onClick={() => this.props.removeTags(_list[i].id)}
                >
                    <span className={Color.text.black}>
                        #{_list[i].name}
                    </span>
                    <Button
                        className="p-event-edit-tag__contents__choice-tag__items__cancel"
                        size="x-small"
                        iconButton
                        theme="dimGray"
                        variant="fill"
                    >
                        <Cross className="p-event-edit-tag__contents__choice-tag__items__cancel__icon"  size="x-small"/>
                    </Button>
                </Button>
            );
        }

        return (
            _elem
        )
    }

    noDataTage() {
        return (
            <div className="p-event-edit-tag__contents__no-Data-tag">
                <Plus theme="dimGray" className="p-event-edit-tag__contents__no-Data-tag__icon"/>
                <p className={'p-event-edit-tag__contents__no-Data-tag__text ' + Color.text.dimGray}>タグを追加してください</p>
            </div>
        )
    }

    /* ------------------------------------------------------------ */
    render() {
        return (
            <div className={'p-event-edit-tag ' + Color.bg.white}>
                 <Header
                    left={
                        <Button variant="textOnly" iconButton onClick={this.props.pageBack}>
                            <ChevronLeft />
                        </Button>
                    }
                    right
                    textAlign="center"
                >
                    タグ編集
                </Header>
                <div className="p-event-edit-tag__contents">
                    {(this.props.tag_list.length > 0) ? 
                        <div className={'p-event-edit-tag__contents__choice-tag ' + Color.bg.body}>
                            {this.createTags()}
                        </div>
                    :
                        <div className={'p-event-edit-tag__contents__choice-tag--no-data ' + Color.bg.body}>
                            {this.noDataTage()}
                        </div>
                    }
                    <div className="p-event-edit-tag__contents__search-tag">
                        <EditTagSearch
                            addTagList={this.props.addTagList}
                            tag_search_list={this.props.tag_search_list}
                            changeTagSearchList={this.props.changeTagSearchList}
                        />
                    </div>
                    <div className="p-event-edit-tag__submit">
                        <Button
                            full
                            className="p-event-edit-tag__submit__button"
                            rightIcon={<ChevronRight />}
                            onClick={this.props.saveTags}
                        >
                            完了する
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventEditTag;
