import { MenuItem } from "../components/menu/menu";

import HelloWorld from '../components/hello-world/hello-world';

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