import { RouteComponentProps } from "react-router-dom";

export type SidePanelBackground =
    'ShadowPurple' | 'MidnightBadger' | 'MarineBlue'
    | 'BlueNight' | 'AmbrosiaIvory' | 'Risotto' | 'JerauPejuang'
    | 'MyrtleGreen';

export type SidepanelItem = {
    name: string;
    active: boolean;
    route: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    
    icon?: string;
    tooltip?: string;
};