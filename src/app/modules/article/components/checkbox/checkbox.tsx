import React from 'react';

import './checkbox.scss';

type CheckboxProps = {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function Checkbox(props: CheckboxProps): JSX.Element {
    return (
        <label className="checkbox-component">
            <input
                type="checkbox"
                checked={props.value}
                onChange={event => props.onChange(event.target.checked)}
            />
            <span className="checkbox-component__mark" />
            <span className="checkbox-component__label">{props.label}</span>
        </label>
    );
}