export type SelectableItem = {
    id: string;
    displayValue: string;
    args?: {
        [keyName: string]: any;
    }
};

export type DropdownState = {
    isOpen: boolean;
    selectedItem?: SelectableItem;
};