import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './app.scss';

import { getMenuItems } from '../../common/utils';
import generateUid from '../../common/uid';

import Home from '../home/home';
import Menu, { MenuItem } from '../menu/menu';

export default function App(): JSX.Element {
    const isLoading: boolean = false;

    const menuItems: Array<MenuItem> =
        getMenuItems();

    return (
        <Router>
            <div className="app">
                <div className={`app__loading-cover app__loading-cover--center${isLoading ? " app__loading-cover--visible" : ""}`}>
                    <img src="loading-02.svg" alt="Loading" />
                </div>
                <div className={`app__contnet${isLoading ? " app__content--loading" : ""}`}>
                    <header className="app-header">
                        <Menu items={menuItems} />
                    </header>
                    <main className="container-fluid">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            {menuItems.map(menuItem => (
                                <Route
                                    key={generateUid()}
                                    path={'/' + menuItem.uri}
                                    component={menuItem.component}
                                />
                            ))}
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};