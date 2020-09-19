/**
 * talk用「バーコードで入室」ラッピングしたLineCardコンポーネント
 */
import React from 'react';
import Checkbox from 'ohaco_components/dist/atoms/Checkbox';
import Label from 'ohaco_components/dist/atoms/Label';
import Thumbnail from 'ohaco_components/dist/atoms/Thumbnail';
import Divider from 'ohaco_components/dist/atoms/Divider';

import './style.css';

const LineCardCheckbox = props => {
    function createLabel() {
        return (
            <div className="m-line-card-checkbox__label__content">
                <Thumbnail
                    src={props.src}
                    alt={props.text}
                    className="m-line-card-checkbox__tumbnail"
                />
                <p className="m-line-card-checkbox__text">
                    {props.text}
                </p>
            </div>
        );
    }

    const handleChange = value => e => {
        if (typeof props.onChange === 'function') {
            props.onChange(value, e.target.checked);
        }
    }

    return (
        <div className="m-line-card-checkbox">
            <Label
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={handleChange(props.id)}
                label={createLabel()}
                className="m-line-card-checkbox__label"
                form={<Checkbox size="medium" theme="secondary" />}
            />
            <Divider />
        </div>
    );
}

export default LineCardCheckbox;
