import { MenuItem } from "../components/menu/menu";

import HelloWorld from '../components/hello-world/hello-world';
import SidePanelPage from "../modules/sidepanel/page";

export const getMenuItems = (): Array<MenuItem> => {
    return [
        {
            name: 'HelloWorld',
            uri: 'helloWorld',
            enabled: true,
            component: HelloWorld
        },
        {
            name: 'SidePanel',
            uri: 'sidePanel',
            enabled: true,
            component: SidePanelPage
        }
    ];
};