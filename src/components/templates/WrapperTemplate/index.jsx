/*global android*/
import React from 'react';

import Tabbar from 'ohaco_components/dist/organisms/Tabbar';
import Color from 'ohaco_components/dist/Color/className';

import './style.css';

const WrapperTemplate = props => {
    let theme = (Color.bg[props.theme]) ? Color.bg[props.theme] : Color.bg.body;

    function checkOS() {
        switch (window.localStorage.getItem('os')) {
            case "Mac OS":
            case "iOS":
                return(
                <Tabbar
                    selectIndex={1}
                    onClickTalk={() => { window.webkit.messageHandlers.hoge.postMessage("Talk") } }
                    onClickMyPage={() => { window.webkit.messageHandlers.hoge.postMessage("Mypage") }}
                    onClickEvent={() => { window.webkit.messageHandlers.hoge.postMessage("Event") }}
                    onClickCoupon={() => { window.webkit.messageHandlers.hoge.postMessage("Coupon") }}
                    onClickReservation={() => { window.webkit.messageHandlers.hoge.postMessage("Reservation") }}
                />)

            case "Windows":
            case "Android":
            case "Linux":
                return(
                <Tabbar
                    selectIndex={1}
                    onClickTalk={() => { android.ChangeMainFragment("Talk"); }}
                    onClickMyPage={() => { android.ChangeMainFragment("Mypage"); }}
                    onClickEvent={() => { android.ChangeMainFragment("Event"); }}
                    onClickCoupon={() => { android.ChangeMainFragment("Coupon"); }}
                    onClickReservation={() => { android.ChangeMainFragment("Reservation"); }}
                />)
            default :
                return(null)
        }
    }

    /* ------------------------------------------------------------ */
    return (
        <div className={'t-wrapper ' + theme}>
            {/* contets */}
            <div className="t-wrapper__contents">
                {props.children}
            </div>{/* .t-wrapper__contents */}

            {/* footer */}
            <footer className="t-wrapper__footer">
                {checkOS()}
            </footer>
        </div>
    );
}

export default WrapperTemplate;
