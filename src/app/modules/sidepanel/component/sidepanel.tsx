import React from 'react';

import './sidepanel.scss';

import { isNullOrUndefined } from '../../../common/utils';
import { getFontColor } from '../../../common/color';

type SidePanelBackground =
    'ShadowPurple' | 'MidnightBadger' | 'MarineBlue'
    | 'BlueNight' | 'AmbrosiaIvory' | 'Risotto' | 'JerauPejuang'
    | 'MyrtleGreen';

export type SidePanelItem = {
    uid: string;
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

export default function SidePanel(props: SidePanelProps): JSX.Element {
    const [state, setState] = React.useState<boolean>(props.expanded || true);

    const backgroundColor: string =
        `#${backgroundColorMap.get(props.background)}`;

    const fontColor: string =
        getFontColor(backgroundColor);

    const className: string =
        state ? ' side-panel--expanded' : '';
    
    return (
        <div className={`side-panel${className}`}>
            <aside className="side-panel__panel" style={{ backgroundColor: backgroundColor, color: fontColor }}>
                <hr style={{ borderTopColor: fontColor }} />
                <ul className="side-panel__items">
                    {props.items.map(item => generateSidePanelItem(item))}
                </ul>
                {generateExpander(state, () => setState(!state))}
            </aside>
            <main className="side-panel__content-container">
                <div className="side-panel__side-content">
                    {props.children}
                </div>
            </main>
        </div>
    );
};

const generateExpander = (expanded: boolean, clickHandler: () => void): JSX.Element => {
    const content =
        expanded
            ? (<div className="side-panel__expander-menu" onClick={clickHandler}>
                <span>Collapse</span>
                <i className="fas fa-angle-double-left" />
            </div>)
            : (<div className="side-panel__expander-menu" onClick={clickHandler}>
                <i className="fas fa-angle-double-right" />
            </div>);

    return (
        <div className="side-panel__expander" onClick={clickHandler}>
            {content}
        </div>);
};

const generateSidePanelItem = (item: SidePanelItem & { uid: string }): JSX.Element => {
    const elementClass: string = isNullOrUndefined(item.icon) ? ' side-panel__item--no-icon' : '';
    const iconClass: string = isNullOrUndefined(item.icon) ? ' icon--empty' : ` fa-${item.icon}`;

    return (
        <li key={item.uid} data-key={item.uid} className={`side-panel__item${elementClass}`}>
            <i className={`fas${iconClass}`} data-letter={item.name.toUpperCase().substr(0, 1)} />
            <span>{item.name}</span>
        </li>
    );
};