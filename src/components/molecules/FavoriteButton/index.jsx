import React, { Component } from 'react';

// icon
import Favorite from 'ohaco_components/dist/atoms/Icon/Favorite';

import './style.css';

class FavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isfavorite : this.props.isfavorite,
            isanimation: false,
            animation : [],
        };
    }

    onClick() {
        if(this.state.isfavorite === false) {
            this.setState({
                isfavorite : true,
                isanimation : true
            })
        } else {
            this.setState({
                isfavorite : false,
                isanimation : false
            })
        }
    }

    createAnimationFavorite() {
        return (
            <Favorite theme="secondary" fillTheme="secondary" className="m-favorite-button--animation"/>
        );
    }

    render() {
        return (
            <div className="m-favorite-button">
                <Favorite
                    theme="black"
                    onClick={() => this.onClick()}
                    size={this.props.size}
                    className={this.props.className}
                    fillTheme={(this.state.isfavorite) ? "secondary" : "white"}
                />
                {(this.state.isanimation) ? this.createAnimationFavorite() : null}
            </div>
        );
    }
}

export default FavoriteButton;
