import { isNullOrEmpty, isNullOrUndefined } from "./utils";

export type RgbColor = {
    red: number;
    green: number;
    blue: number;
};

export function isRgbColor(colorString: string): boolean {
    return colorString.trim().startsWith('rgb');
}

export function isHexColor(colorString: string): boolean {
    return !isNullOrUndefined(colorString)
        && /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/i.test(colorString);
}

export function getRgbColor(colorString: string): RgbColor | undefined {
    if (!isRgbColor(colorString)) {
        return undefined;
    }
    const colorGroups: Array<string> | null =
        colorString.trim().match(/\d+/g);

    if (isNullOrUndefined(colorGroups)) {
        return undefined;
    }

    return {
        red: parseInt(colorGroups![0], 10),
        green: parseInt(colorGroups![1], 10),
        blue: parseInt(colorGroups![2], 10),
    };
}

export function hexToRgb(hexColor: string): RgbColor | undefined {
    if (isNullOrEmpty(hexColor)) {
        return undefined;
    }

    if (!isHexColor(hexColor)) {
        return undefined;
    }

    hexColor = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    } : undefined;
}

const blackHex: string = '#000';
const whiteHex: string = '#fff';

export function getFontColor(colorString: string): string {
    if (isNullOrEmpty(colorString)) {
        throw new Error("Color string must be defined as non empty string.");
    }

    const rgbColor: RgbColor | undefined =
        isRgbColor(colorString)
            ? getRgbColor(colorString)
            : hexToRgb(colorString);

    if (!isNullOrUndefined(rgbColor)) {
        const intensity: number
            = rgbColor.red * 0.299
            + rgbColor.green * 0.587
            + rgbColor.blue * 0.114;

        return intensity > 125 ? blackHex : whiteHex;
    }

    throw new Error(`Cannot get color from color string "${colorString}".`);
}

export function normalizeColor(colorString: string): string {
    if (isNullOrEmpty(colorString)) {
        throw new Error("Color string must be defined as non empty string.");
    }

    const rgbColor: RgbColor | undefined =
        isRgbColor(colorString)
            ? getRgbColor(colorString)
            : hexToRgb(colorString);

    if (!isNullOrUndefined(rgbColor)) {
        return `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
    }

    throw new Error(`Cannot get color from color string "${colorString}".`);
}