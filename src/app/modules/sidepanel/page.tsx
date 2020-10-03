import React from 'react';

import { emptyFn } from '../../common/utils';

import SidePanel, { SidePanelItem } from './component/sidepanel';

export default function SidePanelPage(): JSX.Element {
    const sidePanelItems: Array<SidePanelItem> =
        [
            {
                name: 'Messaging',
                icon: 'fax',
                tooltip: '',
            },
            {
                name: 'Contacts',
                icon: 'address-card',
                tooltip: ''
            },
            {
                name: 'Courses',
                icon: 'user-graduate',
                tooltip: ''
            }
        ];

    return (
        <div>
            <SidePanel
                background='MidnightBadger'
                caption={`Test sidePanel`}
                items={sidePanelItems}
                onItemClick={emptyFn}
            />
            {generateStuffContent()}
        </div>
    );
};

const generateStuffContent = (): JSX.Element => {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>
                    Aww yeah, you successfully read this important alert message.
                    This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
                </p>
                <hr />
                <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>

            <div className="card-deck">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        </div>
    );
};