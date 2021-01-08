import React from 'react';

import './checkbox.scss';

type CheckboxProps = {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function Checkbox(props: CheckboxProps): JSX.Element {
    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            props.onChange(event.target.checked);
        },
        [props]);

    return (
        <label className="checkbox-component">
            <input
                className="checkbox-component__input"
                type="checkbox"
                checked={props.value}
                onChange={onChange}
            />
            <span className="checkbox-component__mark" />
            <span className="checkbox-component__label">{props.label}</span>
        </label>
    );
}