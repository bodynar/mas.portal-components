import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './sidepanel.scss';

import { getFontColor } from '../../../common/color';
import generateUid from '../../../common/uid';

import { getBackground } from '../utils';
import { SidePanelBackground, SidepanelItem } from '../types';

import SidePanelItem from '../components/sidepanelItem/sidepanelItem';
import { isNullOrUndefined } from '../../../common/utils';

export type SidePanelProps = {
    background: SidePanelBackground;
    items: Array<SidepanelItem>;
    onItemClick?: (item: SidepanelItem) => void;
    expanded?: boolean;
};

type SidepanelState = {
    expanded: boolean;
    items: Array<SidepanelItem & { uid: string }>;
    activeItemUid?: string;
};

export default function SidePanel(props: SidePanelProps): JSX.Element {
    const [state, setState] = React.useState<SidepanelState>({
        expanded: props.expanded || true,
        items: props.items.map(x => ({ ...x, uid: generateUid() }))
    });

    const toggleExpanded = React.useCallback(() => setState({ ...state, expanded: !state.expanded }), [state]);
    const setActiveItem =
        React.useCallback((itemUid: string) => {
            setState({ ...state, activeItemUid: itemUid });

            if (!isNullOrUndefined(props.onItemClick)) {
                const activeItem: SidepanelItem | undefined =
                    state.items.find(item => item.uid === state.activeItemUid);

                if (!isNullOrUndefined(activeItem)) {
                    props.onItemClick(activeItem);
                }
            }

        }, [state, props.onItemClick]);

    const backgroundColor: string =
        `#${getBackground(props.background)}`;

    const fontColor: string =
        getFontColor(backgroundColor);

    const className: string =
        state.expanded ? ' side-panel--expanded' : '';

    return (
        <Router>
            <div className={`side-panel${className}`}>
                <aside className="side-panel__panel" style={{ backgroundColor: backgroundColor, color: fontColor }}>
                    <hr style={{ borderTopColor: fontColor }} />
                    <div className="side-panel__items">
                        {state.items.map(item =>
                            <SidePanelItem
                                key={item.uid}
                                item={item}
                                onItemClick={setActiveItem}
                                selected={item.uid === state.activeItemUid}
                            />
                        )}
                    </div>
                    <Expander
                        expanded={state.expanded}
                        onClick={toggleExpanded}
                    />
                </aside>
                <main className="side-panel__content-container">
                    <div className="side-panel__side-content">
                        <Switch>
                            {state.items.map(item =>
                                <Route
                                    key={item.uid}
                                    exact
                                    path={`/${item.route}`}
                                    component={item.component}
                                    render={item.render}
                                />
                            )}
                        </Switch>
                    </div>
                </main>
            </div>
        </Router>
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
