import React, { Component } from 'react';

import EventTop from './actions/Event/EventTop';
import EventDetail from './actions/Event/EventDetail';
import EventCreate from './actions/Event/EventCreate';
import EventEdit from './actions/Event/EventEdit';
import EventSearch from './actions/Event/EventSearch';
import EventInviteMember from './actions/Event/EventInviteMembers';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event_modal : false,
            value : {}
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
    }

    switchPage() {
        let Detail = undefined;
        
        if(this.state.event_modal){
            Detail = <EventDetail
            open={this.state.event_modal}
            hideEventDetail={() => this.hideEventDetail()}
            changePage={this.props.changePage}
            event_id={this.state.value}
            />;
        }

        switch (this.props.page_name) {
            case 'EventCreate':
                return (
                    <EventCreate
                        event_info={this.props.value}
                        changePage={this.props.changePage}
                    />
                );
            case 'EventEdit':
                return(
                    <EventEdit
                        changePage={this.props.changePage}
                    />
                );
            case 'EventSearch':
                return (
                    <EventSearch
                        changePage={this.props.changePage}
                        showEventDetail={(e) => this.showEventDetail(e)}
                        EventDetail={Detail}
                    />
                );
            case 'EventInviteMember':
                return (
                    <EventInviteMember
                        event_id={this.props.value}
                        changePage={this.props.changePage}
                    />
                )
            
            default:
                return (
                    <EventTop
                        changePage={this.props.changePage}
                    />
                );
        }
    }

    render() {
        return (
            <>{this.switchPage()}</>
        );
    }
}

export default Event;
