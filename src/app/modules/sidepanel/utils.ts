import { SidePanelBackground } from './types';

const backgroundColorMap: Map<SidePanelBackground, string> = new Map<SidePanelBackground, string>([
    ['ShadowPurple', '462B45'],
    ['MidnightBadger', '575965'],
    ['MarineBlue', '043353'],
    ['BlueNight', '323846'],
    ['AmbrosiaIvory', 'FFF4EA'],
    ['Risotto', 'F7F4E7'],
    ['JerauPejuang', '762014'],
    ['MyrtleGreen', '275A53'],
]);

export const getBackground = (theme: SidePanelBackground): string => {
    if (!backgroundColorMap.has(theme)) {
        throw new Error(`Theme ${theme} isn't defined.`);
    }

    return backgroundColorMap.get(theme)!;
};