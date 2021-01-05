export type SelectableItem = {
    id: string;
    displayValue: string;
    args?: {
        [keyName: string]: any;
    }
};

export type SortOrder<T> = {
    fieldName: keyof T;
    order: 'asc' | 'desc';
};

export type DropdownState = {
    isOpen: boolean;
    selectedItem?: SelectableItem;
};