/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Link, useLocation } from "react-router-dom";

import generateUid from '../../common/uid';

export type MenuItem = {
    name: string;
    enabled: boolean;
    uri: string;
    component: React.ComponentType<any>;
};

export type MenuProps = {
    items: Array<MenuItem>;
};

const defaultMenuProps: MenuProps = {
    items: []
};

export default function Menu(props: MenuProps = defaultMenuProps): JSX.Element {
    const mappedMenuItems: Array<MenuItem & { uid: string }> =
        props.items.map(menuItem => ({
            ...menuItem,
            uid: generateUid()
        }));
    
    const { pathname } = useLocation();

    return (
        <nav className='navbar navbar-light navbar-expand-lg' style={{ backgroundColor: '#e3f2fd' }}>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarText' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarText'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link
                            className={(pathname === '/' ? 'active ' : '') + 'nav-link'}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>

                    {mappedMenuItems.map(item =>
                        <li className='nav-item' key={item.uid}>
                            <Link
                                className={(item.enabled ? '' : 'disabled ') + (pathname === `/${item.uri}` ? 'active ' : '') + 'nav-link'}
                                to={'/' + item.uri}
                            >
                                {item.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};