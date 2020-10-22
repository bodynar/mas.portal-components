import React from 'react';

import generateUid from '../../../common/uid';
import { isNullOrEmpty } from '../../../common/utils';

type ButtonType = 
    'Custom' | 'Primary' | 'Secondary' |
    'Info' | 'Light' | 'Dark' |
    'Success' | 'Warning' | 'Danger';

export type ButtonProps = {
    caption: string;
    buttonType: ButtonType;
    onButtonClick: () => void;
    isOutlined?: boolean;
    className?: string;
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

    let className: string =
        type === ''
            ? ''
            : (props.isOutlined || false) ? `btn-outline-${type}`: `btn-${type}`;

    if (!isNullOrEmpty(props.className)) {
        className += ` ${props.className}`;
    }

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