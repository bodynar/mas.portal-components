import React from 'react';

import './dropdown.scss';

import { isNullOrEmpty, isNullOrUndefined } from '../../../../common/utils';

import { isDropdownItem } from './utils';
import { DropdownState, SelectableItem } from './types';

type DropdownProps = {
    canDeselect: boolean;
    caption: string;
    items: Array<SelectableItem>;
    onItemSelect: (item?: SelectableItem) => void;
    selectedItem?: SelectableItem;
    displayValueTemplateGenerator?: (item: SelectableItem) => JSX.Element;
};

// TODO:
// 1. Selection caption block width dynamiccly width change from text width (use util)

export default function Dropdown(props: DropdownProps): JSX.Element {
    const [state, setState] = React.useState<DropdownState>({
        isOpen: false,
        selectedItem: props.selectedItem
    });

    const toggleOpenState = React.useCallback(
        ({ target }: React.MouseEvent<HTMLDivElement>): void => {
            if (target instanceof HTMLElement
                && target.nodeName.toLowerCase() === 'i'
                && target.classList.contains('fa-times')
            ) {
                return;
            }

            setState({
                ...state,
                isOpen: !state.isOpen
            });
        }, [state]);

    const onIconClick = React.useCallback(
        (): void => {
            if (props.canDeselect && !state.isOpen) {
                setState({ isOpen: false });

                props.onItemSelect();
            }
        }, [props, state.isOpen]);

    const onItemTagClick = React.useCallback(
        (event: React.MouseEvent<HTMLUListElement, MouseEvent>): void => {
            if (!isNullOrUndefined(event.target)
                && event.target instanceof HTMLElement
            ) {
                const eventTarget: HTMLElement =
                    event.target as HTMLElement;

                if (eventTarget.tagName.toLowerCase() === 'li'
                    && !isNullOrUndefined(eventTarget.dataset['ddItem'])) {
                    const itemId: string | undefined =
                        eventTarget.dataset['ddItem'];

                    if (!isNullOrEmpty(itemId)) {
                        const item: SelectableItem =
                            props.items.find(x => x.id === itemId)!;

                        setState({ isOpen: false, selectedItem: item });

                        props.onItemSelect(item);
                    } else {
                        window.console.warn(`[Dropdown]: `);
                    }
                }
            }
        }, [props]);

    React.useEffect(() => {
        const onDocumentClick = (event: MouseEvent): void => {
            if (!isNullOrUndefined(event.target)
                && event.target instanceof HTMLElement
                && !isDropdownItem(event.target)
            ) {
                setState({
                    ...state,
                    isOpen: false
                })
            }
        }

        document.addEventListener('click', onDocumentClick);

        return () => {
            document.removeEventListener('click', onDocumentClick);
        };
    }, [state]);

    const selectionClassName: string =
        !isNullOrUndefined(state.selectedItem)
            ? '' : ' dropdown__selection--empty';

    const captionIcon: string =
        state.isOpen
            ? 'fa-angle-down fa-angle-down--rotated'
            : props.canDeselect && !isNullOrUndefined(state.selectedItem)
                ? 'fa-times'
                : 'fa-angle-down';

    const itemsClassName: string =
        state.isOpen ? '' : ' dropdown__items--hidden'

    return (
        <div
            className="dropdown"
            data-dropdown-control={true}
        >
            <div
                className={`dropdown__selection${selectionClassName}`}
                onClick={toggleOpenState}
            >
                <div
                    className="dropdown__selection-caption"
                    title={state.selectedItem?.displayValue}
                >
                    <DropdownCaption
                        caption={props.caption}
                        item={state.selectedItem}
                        displayValueTemplateGenerator={props.displayValueTemplateGenerator}
                    />
                </div>
                <i
                    className={`fa ${captionIcon}`}
                    onClick={onIconClick}
                />
            </div>
            <ul
                className={`dropdown__items${itemsClassName}`}
                data-dropdown-control={true}
                onClick={onItemTagClick}
            >
                {props.items.map(item =>
                    <li
                        key={item.id}
                        data-dd-item={item.id}
                        data-selected={state.selectedItem && item.id === state.selectedItem.id}
                    >
                        <DropdownCaption
                            caption={''}
                            item={item}
                            displayValueTemplateGenerator={props.displayValueTemplateGenerator}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

const DropdownCaption = (props: {
    caption: string;
    item?: SelectableItem;
    displayValueTemplateGenerator?: (item: SelectableItem) => JSX.Element;
}): JSX.Element => {
    if (!isNullOrUndefined(props.item)) {
        if (!isNullOrUndefined(props.displayValueTemplateGenerator)) {
            return (
                <>{props.displayValueTemplateGenerator(props.item)}</>
            );
        } else {
            return (
                <>{props.item.displayValue}</>
            );
        }
    } else {
        return (<>{props.caption}</>);
    }
};