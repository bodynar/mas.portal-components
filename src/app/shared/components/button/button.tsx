import React from 'react';

import generateUid from '../../../common/uid';

type ButtonType = 
    'Custom' | 'Primary' | 'Secondary' |
    'Info' | 'Light' | 'Dark' |
    'Success' | 'Warning' | 'Danger';

export type ButtonProps = {
    caption: string;
    buttonType: ButtonType;
    onButtonClick: () => void;
    isOutlined?: boolean;
};

const typeClassNameMap: Map<ButtonType, string> =
    new Map([
        ['Custom', ''],
        ['Primary', 'primary'],
        ['Secondary', 'secondary'],
        ['Info', 'info'],
        ['Light', 'light'],
        ['Dark', 'dark'],
        ['Success', 'success'],
        ['Warning', 'warning'],
        ['Danger', 'danger'],
    ]);

export default function Button(props: ButtonProps) {
    const id: string = generateUid();

    const type: string =
        typeClassNameMap.get(props.buttonType) || '';

    const className: string =
        type === ''
            ? ''
            : (props.isOutlined || false) ? `btn-outline-${type}`: `btn-${type}`;

    return (
        <button
            id={id}
            className={`btn ${className}`}
            onClick={props.onButtonClick}
        >
            {props.caption}
        </button>
    );
}