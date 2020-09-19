import React, { Component } from 'react';
import Page from '../../components/pages/EventCreate';

class EventEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Eventによってtagが違うので修正必要
            //tag: typeof window.localStorage.getItem('tag') !== 'undefined' && window.localStorage.getItem('tag') !== null ? JSON.parse(window.localStorage.getItem('tag')) : []
        }
    }

    pageBack = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('');
        }
    }

    submit = () => {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('');
        }
    }

    showEditTag() {
        if (typeof this.props.changePage === 'function') {
            this.props.changePage('EventEditTag');
        }
    }

    render() {
        return (
            <Page
                pageBack={() => this.pageBack()}
                submit={() => this.submit()}
            />
        );
    }
}

export default EventEdit;