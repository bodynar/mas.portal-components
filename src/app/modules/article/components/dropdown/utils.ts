import { isNullOrUndefined } from '../../../../common/utils';

export const isDropdownItem = (element: HTMLElement): boolean => {
    let result: boolean =
        !isNullOrUndefined(element)
        && !isNullOrUndefined(element.attributes.getNamedItem("data-dropdown-control"));

    if (!result
        && !isNullOrUndefined(element)
        && !isNullOrUndefined(element.parentElement)
        && element.tagName !== 'HTML'
        && element.tagName !== 'BODY'
    ) {
        result = isDropdownItem(element.parentElement!);
    }

    return result;
};

export const getTextWidth = (text: string, fontSize: number): number => {
    // TODO
    return 0;
};