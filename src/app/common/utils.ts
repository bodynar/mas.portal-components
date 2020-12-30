export const emptyFn = () => { };

export const isNullOrUndefined = (value: any): value is undefined => {
    return value === undefined || value === null;
};

export const has = <TItem>(array: Array<TItem>, item: TItem): boolean => {
    return !isNullOrUndefined(
        array.find(x => x === item)
    );
};