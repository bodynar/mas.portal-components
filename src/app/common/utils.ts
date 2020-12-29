export const emptyFn = () => { };

export const isNullOrUndefined = (value: any): value is undefined => {
    return value === undefined || value === null;
}