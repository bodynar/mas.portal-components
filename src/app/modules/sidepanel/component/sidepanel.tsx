import React from 'react';

import './sidepanel.scss';

import { isNullOrUndefined } from '../../../common/utils';
import { getFontColor } from '../../../common/color';
import generateUid from '../../../common/uid';

type SidePanelBackground =
    'ShadowPurple' | 'MidnightBadger' | 'MarineBlue'
    | 'BlueNight' | 'AmbrosiaIvory' | 'Risotto' | 'JerauPejuang'
    | 'MyrtleGreen';

export type SidePanelItem = {
    name: string;
    icon?: string;
    tooltip?: string;
};

export type SidePanelProps = {
    background: SidePanelBackground;
    items: Array<SidePanelItem>;
    children: JSX.Element;
    onItemClick: (name: string) => void;
    expanded?: boolean;
};

const backgroundColorMap: Map<SidePanelBackground, string> = new Map<SidePanelBackground, string>([
    ['ShadowPurple', '462B45'],
    ['MidnightBadger', '575965'],
    ['MarineBlue', '043353'],
    ['BlueNight', '323846'],
    ['AmbrosiaIvory', 'FFF4EA'],
    ['Risotto', 'F7F4E7'],
    ['JerauPejuang', '762014'],
    ['MyrtleGreen', '275A53'],
]);

type SidepanelState = {
    expanded: boolean;
    items: Array<SidePanelItem & { uid: string }>;
};

// TODO:
// 2. Active state (selected item)

export default function SidePanel(props: SidePanelProps): JSX.Element {
    const [state, setState] = React.useState<SidepanelState>({
        expanded: props.expanded || true,
        items: props.items.map(x => ({ ...x, uid: generateUid() }))
    });

    const toggleExpanded = React.useCallback(() => setState({ ...state, expanded: !state.expanded }), [state]);

    const backgroundColor: string =
        `#${backgroundColorMap.get(props.background)}`;

    const fontColor: string =
        getFontColor(backgroundColor);

    const className: string =
        state.expanded ? ' side-panel--expanded' : '';

    return (
        <div className={`side-panel${className}`}>
            <aside className="side-panel__panel" style={{ backgroundColor: backgroundColor, color: fontColor }}>
                <hr style={{ borderTopColor: fontColor }} />
                <ul className="side-panel__items">
                    {state.items.map(item =>
                        <SidePanelItem
                            item={item}
                        />
                    )}
                </ul>
                <Expander
                    expanded={state.expanded}
                    onClick={toggleExpanded}
                />
            </aside>
            <main className="side-panel__content-container">
                <div className="side-panel__side-content">
                    {props.children}
                </div>
            </main>
        </div>
    );
};

const Expander = (props: { expanded: boolean, onClick: () => void }): JSX.Element => {
    const iconClassName: string =
        props.expanded ? 'left' : 'right';

    return (
        <div className="side-panel__expander" onClick={props.onClick}>
            <div className="side-panel__expander-menu">
                {props.expanded
                    ? <span>Collapse</span>
                    : <></>
                }
                <i className={`fas fa-angle-double-${iconClassName}`} />
            </div>
        </div>
    );
};

const SidePanelItem = (props: { item: SidePanelItem & { uid: string } }): JSX.Element => {
    const elementClass: string = isNullOrUndefined(props.item.icon) ? ' side-panel__item--no-icon' : '';
    const iconClass: string = isNullOrUndefined(props.item.icon) ? ' icon--empty' : ` fa-${props.item.icon}`;

    const dataLetter: string | undefined =
        isNullOrUndefined(props.item.icon)
            ? props.item.name.toUpperCase().substr(0, 1) : undefined;

    return (
        <li
            key={props.item.uid}
            className={`side-panel__item${elementClass}`}
        >
            <i
                className={`fas${iconClass}`}
                data-letter={dataLetter}
            />
            <span>
                {props.item.name}
            </span>
        </li>
    );
};