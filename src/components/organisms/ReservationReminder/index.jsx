/**
 * イベント作成オーナー用の予約リマインダー
 */
import React from 'react';

import Button from 'ohaco_components/dist/atoms/Button';
import Fixed from 'ohaco_components/dist/atoms/Fixed';
import Ballon from 'ohaco_components/dist/molecules/Balloon';

import Portal from '@material-ui/core/Portal';
import Fade from '@material-ui/core/Fade';

import './style.css';

const ReservationReminder = props => {

    /* ------------------------------------------------------------ */
    return (
        <Portal>
            <Fade in={props.open} timeout={800}>
                <Fixed
                    className="o-reservation-reminder-wrapper"
                    direction="left"
                    position="bottom"
                    positonShift="10"
                >
                    <Ballon
                        className="o-reservation-reminder"
                        position="left" direction="top"
                        elevation="floating-paper"
                    >
                        <div className="o-reservation-reminder__image">
                            <img
                                className="o-reservation-reminder__image__img"
                                src={require('./images/img_reservation_reminder.svg')}
                                alt="予約イメージ"
                            />
                        </div>
                        <p className="o-reservation-reminder__note">
                            お店のご予約はお済みですか？<br />
                            まだでしたらWebサイトからご予約ください。<br />
                            <small className="o-reservation-reminder__note__small">※イベントの場所設定では、予約は完了しません。</small>
                        </p>
                        <div className="o-reservation-reminder__actions">
                            <Button onClick={props.onTodo} className="o-reservation-reminder__actions__button">また後で</Button>
                            <Button onClick={props.onAlready} className="o-reservation-reminder__actions__button">予約済み！</Button>
                            <Button onClick={props.onMoveReserve} className="o-reservation-reminder__actions__button">予約する</Button>
                        </div>
                    </Ballon>
                </Fixed>
            </Fade>
        </Portal>
    );
}

export default ReservationReminder;
