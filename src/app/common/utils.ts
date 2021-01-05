export const emptyFn = () => { };

export const isNullOrUndefined = (value: any): value is undefined => {
    return value === undefined || value === null;
};

export const isNullOrEmpty = (value: string): boolean => {
    return isNullOrUndefined(value) || value === '';
}

export const has = <TItem>(array: Array<TItem>, item: TItem): boolean => {
    return !isNullOrUndefined(
        array.find(x => x === item)
    );
};

export const hasIn = <TItem>(searchArray: Array<TItem>, sourceArray: Array<TItem>): boolean => {
    return sourceArray.some(item => has(searchArray, item));
};

export const getValueByPath = (object: any, propertyPath: string): any => {
    let result: any = object;

    const propertyPathParts: Array<string> =
        propertyPath.replace(/\[(\w+)\]/g, '.$1')
            .replace(/^\./, '')
            .split('.');

    for (var index = 0; index < propertyPathParts.length; ++index) {
        const propertyNamePart: string =
            propertyPathParts[index];

        if (propertyNamePart in result) {
            result = result[propertyNamePart];
        } else {
            return;
        }
    }

    return result;
};