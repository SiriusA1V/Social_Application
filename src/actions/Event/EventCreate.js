import React, { Component } from 'react';
import Page from '../../components/pages/EventCreate';
import Api from '../../Api';

import EventEditTag from '../../actions/Event/EventEditTag'

class EventCreate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

            changeEvent : "EventCreate",
            // Eventによってtagが違うので修正必要

            place : []
        }

        if(""+typeof this.props.event_info !== ""+undefined && ""+typeof this.props.event_info === "object"){
            this.state.event_info = this.props.event_info;
            this.state.event_info.tag = this.setTagInfo(this.state.event_info.tag);
            this.state.event_info.start_date = this.encode_date(this.state.event_info.start_date)
            this.state.event_info.end_date = this.encode_date(this.state.event_info.end_date)
        }else{
            this.state.event_info = {
                event_name : "",
                start_date : "",
                end_date : "",
                shop_id : "0",
                comment : "",
                hiding : "all",  
                tag : [],                   
            };
        }

        Api.getShopList(this.setPlaceList);
    }

    setTagInfo(tag){
        var re_tag = [];

        for(var i = 0; i < tag.length; i++){
            re_tag[i] = {};

            re_tag[i].id = tag[i].tag_id;
            re_tag[i].name = tag[i].tag_name_full;
        }

        return re_tag;
    }

    setPlaceList = (e) => {
        var save = [];
        
        save[0] = {};
        save[0].value = "0";
        save[0].label = "未設定";

        for(var i = 1; i <= e.length; i++){
            save[i] = {};

            save[i].value = e[i-1].shop_id;
            save[i].label = e[i-1].shop_name;
        }
        
        this.setState({
            place : save
        })
    }

    pageBack = () => {
        if (typeof this.props.changePage === 'function') {   
            //window.localStorage.setItem('tag', JSON.stringify([]));
            this.props.changePage('');
        }
    }

    submit = () => {
        if (typeof this.props.changePage === 'function') {
            var info = this.state.event_info;

            info.member_id = window.localStorage.getItem("userId");
            info.member_name = window.localStorage.getItem("name");
            info.start_date = this.decode_date(info.start_date);
            info.end_date = this.decode_date(info.end_date);
            info.tag = this.set_tag(info.tag);

            //console.log(info);

            Api.eventCreate(info, this.props.changePage);

            //window.localStorage.setItem('tag', JSON.stringify([]));            
        }
    }

    showEditTag=()=>{
        /*
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventEditTag');
        }
        */
        this.setState({
            changeEvent : "EventEditTag"
        })
    }

    showCreate=()=>{
        this.setState({
            changeEvent : "EventCreate"
        })
    }

    onChangeState = (val, e) =>{        
        
        if(e.target === undefined){
            this.setState({
                event_info : {
                    ...this.state.event_info,
                    [e] : val
                }
            })
        }else{
            this.setState({
                event_info : {
                    ...this.state.event_info,
                    [e.target.id] : val
                }
            })
        }        
    }

    decode_date(date){
        return (""+date).replace(/(\/| |　|:)/gm, "") + "0000";
    }

    encode_date(date){
        var dt = ""+date;
        return dt.substr(0,4) + "/" + dt.substr(4,2) + "/" + dt.substr(6,2) + " " + dt.substr(8,2) + ":" + dt.substr(10,2);
    }

    set_tag(tag){
        var arr = [];
        
        for(var i = 0; i < tag.length; i++){
            arr[i] = {};

            arr[i].tag_id = tag[i].id;
            arr[i].tag_name_full = tag[i].name;
        }


        return arr;
    }

    render() {

        switch(this.state.changeEvent){
            case "EventCreate":
                return (
                    <Page
                        place={this.state.place}
                        tag={this.state.event_info.tag}
                        showEditTag={() => this.showEditTag()}
                        pageBack={() => this.pageBack()}
                        submit={() => this.submit()}
                        onChangeState={this.onChangeState}
                        event_info={this.state.event_info}
                    />
                );
            case "EventEditTag":
                return (
                    <EventEditTag
                        showCreate={this.showCreate}
                        onChangeState={this.onChangeState}
                        tag={this.state.event_info.tag}
                    />
                );
            default :
                return (
                    <Page
                        place={this.state.place}
                        tag={this.state.event_info.tag}
                        showEditTag={() => this.showEditTag()}
                        pageBack={() => this.pageBack()}
                        submit={() => this.submit()}
                        onChangeState={this.onChangeState}
                        event_info={this.state.event_info}
                    />
                );
        }        
    }
}

export default EventCreate;