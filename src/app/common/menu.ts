import { MenuItem } from "../components/menu/menu";

import HelloWorld from '../components/hello-world/hello-world';
import SidePanelPage from "../modules/sidepanel/page";
import CommentsPage from "../modules/comments/page";

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
        },
        {
            name: 'Comments',
            uri: 'comments',
            enabled: true,
            component: CommentsPage
        },
    ];
};