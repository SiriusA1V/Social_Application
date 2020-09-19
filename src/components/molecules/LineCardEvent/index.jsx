/**
 * Event用にラッピングしたLineCardコンポーネント
 */
import React from 'react';
import Tag from 'ohaco_components/dist/atoms/Tag';
import LineCard from 'ohaco_components/dist/molecules/LineCard';
import Lock from 'ohaco_components/dist/atoms/Icon/Lock';

import './style.css';

const LineCardEvent = props => {
    function handleClick() {
        if (typeof props.onClick === 'function') props.onClick();
    }

    /**
     * TodayTag生成
     * @param {*} today
     */
    function createTodayTag(today) {
        if (today) {
            return (
                <Tag
                    className="m-line-card-event__datetime__today__tag"
                    size="x-small"
                    theme="primary"
                >
                    TODAY
                </Tag>
            )
        } else {
            return null;
        }
    }

    /**
     * 非公開Tag生成
     * @param {*} open
     */
    function createOpenTag(open) {
        if (!open) {
            return (
                <Tag
                    className="m-line-card-event__datetime__open__icon-tag"
                    size="x-small"
                    theme="gray"
                >
                    <Lock
                        className="m-line-card-event__datetime__open__icon-tag__icon"
                        size="x-small"
                    />
                    <span className="m-line-card-event__datetime__open__icon-tag__text">
                        非公開
                    </span>
                </Tag>
            )
        } else {
            return null;
        }
    }

    /* ------------------------------------------------------------ */
    return (

        <LineCard
            className="m-line-card-event"
            onClick={() => handleClick()}
        >
            <div className="m-line-card-event__datetime">
                <span className="m-line-card-event__datetime__month">
                    {props.date.month + '/'}
                </span>
                <span className="m-line-card-event__datetime__day">
                    {props.date.day}
                </span>
                <span className="m-line-card-event__datetime__today">
                    {'(' + props.date.week + ')'}
                </span>
                <span className="m-line-card-event__datetime__time">
                    {props.start_time + '~'}
                </span>
                <span className="m-line-card-event__datetime__today-event">
                    {createTodayTag(props.today)}
                </span>
                <span className="m-line-card-event__datetime__open">
                    {createOpenTag(props.open)}
                </span>
            </div>
            <div className="m-line-card-event__title">
                {props.title}
            </div>
            <div className="m-line-card-event__store">
                {props.store}
            </div>
        </LineCard>
    );
}

export default LineCardEvent;
