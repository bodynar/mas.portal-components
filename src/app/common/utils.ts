export const emptyFn = () => { };

export const isUndefined = (value: any): value is undefined => {
    return value === undefined;
}

export const isNull = (value: any): value is null => {
    return value === null;
}

export const isNullOrUndefined = (value: any): value is undefined | null => {
    return isUndefined(value) || isNull(value);
}

export const isNullOrEmpty = (value?: string): boolean => {
    return isNullOrUndefined(value) || value === '';
}