import React from 'react';

import './search.scss';

import { isNullOrUndefined } from '@app/utils/utils';

type SearchProps = {
    query: string;
    buttonCaption?: string;
    placeholder?: string;
    onSearchQueryChange: (searchText: string) => void;
    onSearchClick?: (searchText: string) => void;
};

export default function Search(props: SearchProps): JSX.Element {
    const placeholder: string =
        props.placeholder || ' ';

    const caption: string =
        props.buttonCaption || 'Search';

    const displaySerchButton: boolean =
        !isNullOrUndefined(props.onSearchClick);

    const onSearchInputChange =
        React.useCallback(
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                if (!isNullOrUndefined(event)) {
                    props.onSearchQueryChange(event.target.value);
                }
            }, [props]);

    const onSearchButtonClick =
        React.useCallback(
            (): void => {
                if (props.query !== '' && !isNullOrUndefined(props.onSearchClick)) {
                    props.onSearchClick(props.query);
                }
            }, [props]);

    return (
        <div className='search'>
            <input
                type="search"
                className={'search__input' + (displaySerchButton ? '' : ` search__input--single`)}
                value={props.query}
                placeholder={placeholder}
                onChange={onSearchInputChange}
            />
            {displaySerchButton &&
                <button
                    className='search__button'
                    onClick={onSearchButtonClick}
                >
                    {caption}
                </button>
            }
        </div>
    );
}