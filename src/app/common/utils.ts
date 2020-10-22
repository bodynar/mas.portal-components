export const emptyFn = () => { };

export const isNullOrUndefined = (value: any): value is null | undefined => {
    return value === undefined || value === null;
};

export const isNullOrEmpty = (value?: string): boolean => {
    return isNullOrUndefined(value) || value === '';
}