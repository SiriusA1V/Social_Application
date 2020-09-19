import React, { Component } from 'react';

import Color from 'ohaco_components/dist/Color/className';
import Header from 'ohaco_components/dist/organisms/Header';
import Button from 'ohaco_components/dist/atoms/Button';
import Fixed from 'ohaco_components/dist/atoms/Fixed';
import TextField from 'ohaco_components/dist/atoms/TextField';
import Thumbnail from 'ohaco_components/dist/atoms/Thumbnail';
import Paper from 'ohaco_components/dist/atoms/Paper';
import ChevronLeftIcon from 'ohaco_components/dist/atoms/Icon/ChevronLeft';
import SearchIcon from 'ohaco_components/dist/atoms/Icon/Search';
import CrossIcon from 'ohaco_components/dist/atoms/Icon/Cross';
import LineCardCheckbox from '../../molecules/LineCardCheckbox';

import './style.css';


class EventInviteMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createSelectedMembers() {
        if (!Array.isArray(this.props.selectedMembers)) return null;

        let members = [];
        for (let i = 0; i < this.props.selectedMembers.length; i++) {
            let selected = this.props.selectedMembers[i];
            members.push(
                <li
                    key={'p-event-invite-member__list__members__li--' + i}
                    className="p-event-invite-member__list__members__li"
                    onClick={() => this.props.cancelSelected(selected)}
                >
                    <Thumbnail
                        size="medium"
                        src={selected.src}
                        alt={selected.name}
                        frameVariant="black"
                        className="p-event-invite-member__list__members__li__thumbnail"
                    />
                    <span className="p-event-invite-member__list__members__li__span">
                        {selected.name}
                    </span>
                    <span className={'p-event-invite-member__list__members__li__button ' + Color.bg.secondary}>
                        <CrossIcon size="small" theme="white" />
                    </span>
                </li>
            );
        }

        if (members.length) members = <ul className="p-event-invite-member__list__members__ul">{members}</ul>;

        return (
            <div className={'p-event-invite-member__list__members '+ Color.bg.body}>
                {members}
            </div>
        );
    }

    createSearchMembers() {
        if (!Array.isArray(this.props.members)) return null;
        let members = [];

        for (let i = 0; i < this.props.members.length; i++) {
            let member = this.props.members[i];
            members.push(
                <li key={'p-event-invite-member__list__search__li--' + i} className="p-event-invite-member__list__search__li">
                    <LineCardCheckbox
                        className="p-event-invite-member__list__search__li__img"
                        name="js-group-create"
                        value={i.toString()}
                        src={member.src}
                        text={member.name}
                        id={member.id}
                        checked={member.selected}
                        onChange={this.props.changeSelected}
                    />
                </li>
            );
        }

        if (members.length) members = <ul className="p-event-invite-member__list__search__ul">{members}</ul>;

        return (
            <div className="p-event-invite-member__list__search">
                {members}
            </div>
        );
    }

    render() {
        return (
            <div className="p-event-invite-member">
                <Header
                    sticky
                    left={
                        <Button variant="textOnly" iconButton onClick={this.props.pageBack}>
                            <ChevronLeftIcon />
                        </Button>}
                    right
                    textAlign="center">
                    メンバーを選択
                </Header>

                {/* 選択中のメンバー */}
                {this.createSelectedMembers()}

                {/* メンバー一覧 */}
                <Paper className="p-event-invite-member__list__search">
                    <div className="p-event-invite-member__list__search__textfield">
                        <TextField
                            full
                            leftIcon={<SearchIcon />}
                            onChange={this.props.searchMembers}
                            placeholder="メンバー"
                        />
                    </div>
                    {this.createSearchMembers()}
                </Paper>

                {/* action */}
                <Fixed
                    className="p-event-invite-member__button"
                    position="bottom"
                    direction="center"
                >
                    <Button
                        full
                        onClick={this.props.submit}
                        size="large"
                    >
                        {this.props.submitLabel ? this.props.submitLabel : '追加する'}
                    </Button>
                </Fixed>
            </div>
        );
    }
}

export default EventInviteMembers;