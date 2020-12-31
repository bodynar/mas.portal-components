export const emptyFn = () => { };

export const isNullOrUndefined = (value: any): value is undefined => {
    return value === undefined || value === null;
};

export const isNullOrEmpty = (value: string): boolean => {
    return !isNullOrUndefined(value) && value !== '';
}

export const has = <TItem>(array: Array<TItem>, item: TItem): boolean => {
    return !isNullOrUndefined(
        array.find(x => x === item)
    );
};

export const hasIn = <TItem>(searchArray: Array<TItem>, sourceArray: Array<TItem>): boolean => {
    return sourceArray.some(item => has(searchArray, item));
};