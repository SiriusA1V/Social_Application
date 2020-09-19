import React, { Component } from 'react';
import Page from '../../components/pages/EventInviteMembers';
import Api from '../../Api';

const kari_photo = require('../../components/pages/images/badge_001.png');
const userId = window.localStorage.getItem("userId");

class EventInviteMembers extends Component {
    constructor(props) {
        super(props);
        // とりあえずのダミーデータ
        this.state = {
            members: [
            ],
            selectedMembers: [],
            save_members : []
        };

        Api.getFriendList(userId, this.setFriendList);
    }

    searchMembers=(e)=>{
        var search_list = [];        

        if(e.length === 0){
            this.setState({
                members : this.state.save_members
            })

            return;
        }

        for(var i = 0; i < this.state.save_members.length; i++){
            if(""+e === (""+this.state.save_members[i].name).substr(0, (e.length))){
                search_list.push(this.state.save_members[i])
            }
        }

        this.setState({
            members : search_list
        })
    }

    setFriendList=(e)=>{
        var memberss = [];

        for(var i = 0; i < e.length; i++){
            memberss[i] = {};

            memberss[i].id = e[i].member_id;
            memberss[i].name = e[i].name;
            memberss[i].src = (""+e[i].photo_url !== "undefined" && e[i].photo_url) ? e[i].photo_url : kari_photo
            memberss[i].selected = false;
        }

        this.setState({
            members : memberss,
            save_members : memberss
        })
    }

    /**
     * 前の画面に戻る
     */
    pageBack = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('');
        }
    }

    /**
     * 招待するボタンをセット
     */
    submit = () => {
        var selectList = this.state.selectedMembers;
        var set_data = [];

        for(var i = 0; i < selectList.length; i++){
            set_data[i] = {};
            
            set_data[i].event_id = this.props.event_id;
            set_data[i].member_id = selectList[i].id;
            set_data[i].member_name = selectList[i].name;
        }

        var callback = () =>{
            if (typeof this.props.changePage === 'function') {
                this.props.changePage('');
            }
        }

        Api.enterEvent(set_data ,callback);        
    }

    /**
     * メンバー選択を変更する
     */
    changeSelected = (id, selected) => {

        let _newMembers = this.state.members.concat(),
            _newSelectedMembers = this.state.selectedMembers.concat();

        let _member, _index;
        _newMembers.forEach((m, i) => {
            if (id === m.id) {
                _member = m; _index = i;
            }
        });

        if (selected) {
            _newMembers[_index].selected = selected;
            _newSelectedMembers.push(_member);
        } else {
            _newMembers[_index].selected = selected;
            _newSelectedMembers = _newSelectedMembers.filter(m => m.id !== id);
        }

        this.setState({
            members: _newMembers,
            selectedMembers: _newSelectedMembers
        });
    }

    /**
     * メンバー選択をキャンセルする
     */
    cancelSelected = (member) => {
        let _newMembers = this.state.members.concat(),
            _newSelectedMembers = this.state.selectedMembers.concat();

        _newMembers.forEach((m, i) => {
            if (m.id === member.id) _newMembers[i].selected = false;
        });
        _newSelectedMembers = _newSelectedMembers.filter(m => m.id !== member.id);

        this.setState({
            members: _newMembers,
            selectedMembers: _newSelectedMembers
        });
    }

    render() {
        return (
            <Page
                pageBack={this.pageBack}
                submit={this.submit}
                submitLabel="招待する"
                changeSelected={this.changeSelected}
                cancelSelected={this.cancelSelected}
                members={this.state.members}
                selectedMembers={this.state.selectedMembers}
                searchMembers={this.searchMembers}
            />
        )
    }
}

export default EventInviteMembers;