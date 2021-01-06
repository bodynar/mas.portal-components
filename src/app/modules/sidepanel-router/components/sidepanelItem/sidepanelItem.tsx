import React from 'react';
import { Link } from 'react-router-dom';

import './sidepanelItem.scss';

import { isNullOrUndefined } from '../../../../common/utils';

import { SidepanelItem } from '../../types';

export type SidePanelItemProps = {
    item: SidepanelItem & { uid: string };
    selected: boolean;
    onItemClick?: (itemUid: string) => void;
};

export default function SidePanelItem(props: SidePanelItemProps): JSX.Element {
    const itemClassName: string =
        (isNullOrUndefined(props.item.icon) ? ' side-panel__item--no-icon' : '')
        + (props.selected ? ' side-panel__item--selected' : '')
        ;

    const iconClass: string = isNullOrUndefined(props.item.icon) ? 'icon--empty' : `fa-${props.item.icon}`;

    const letter: string | undefined =
        isNullOrUndefined(props.item.icon)
            ? props.item.name.toUpperCase().substr(0, 1)
            : undefined;

    const onItemClick: () => void = React.useCallback(() => {
        if (!isNullOrUndefined(props.onItemClick)) {
            props.onItemClick(props.item.uid);
        }
    }, [props]);

    return (
        <Link
            to={props.item.route}
            className={`side-panel__item${itemClassName}`}
            onClick={onItemClick}
        >
            <i
                className={`fas ${iconClass}`}
                data-letter={letter}
            />
            <span>
                {props.item.name}
            </span>
        </Link>
    );
};