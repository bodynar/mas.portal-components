export type SidePanelBackground =
    'ShadowPurple' | 'MidnightBadger' | 'MarineBlue'
    | 'BlueNight' | 'AmbrosiaIvory' | 'Risotto' | 'JerauPejuang'
    | 'MyrtleGreen';

export type SidepanelItem = {
    name: string;
    active: boolean;
    icon?: string;
    tooltip?: string;
};