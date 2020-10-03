import { MenuItem } from "../components/menu/menu";

import HelloWorld from '../components/hello-world/hello-world';

export const emptyFn = () => {};

export const isNullOrUndefined = (value: any): boolean => {
    return value === undefined || value === null;
}

export const getMenuItems = (): Array<MenuItem> => {
    return [
        {
            name: 'HelloWorld',
            uri: 'helloWorld',
            enabled: true,
            component: HelloWorld
        },
    ];
};