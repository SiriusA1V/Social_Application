import React, { Component } from 'react';

import Event from './Event';


// base設定
import 'ohaco_components/dist/base.css';
import 'ohaco_components/dist/Color/style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page_name: 'EventTop',
            value: null
        }

        //karikarikarikari
        if(typeof window.localStorage.getItem('userId') === 'undefined' || ""+localStorage.getItem('userId') === ""+null) window.localStorage.setItem('userId', "m_5b7952e7-d540-463c-a43b-a289e8719416");
        if(typeof window.localStorage.getItem('name') === 'undefined' || ""+localStorage.getItem('name') === ""+null) window.localStorage.setItem('name', "butaniku");
    }

    getOS () {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macos = ['Macintosh','MacIntel','MacPPC','Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
            if (macos.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
                window.oncontextmenu = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                };
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }
            window.localStorage.setItem('os',os);
    }

    changePage = (page_name, value) => {
        window.scrollTo(0,0);
        this.setState({
            page_name: page_name,
            value: value
        });
    }

    /* ------------------------------------------------------------ */
    render () {
        this.getOS();

        return (
            <Event
                page_name={this.state.page_name}
                changePage={this.changePage}
                value={this.state.value}
            />
        );
    }
}

export default App;
