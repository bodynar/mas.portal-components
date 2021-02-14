import React from 'react';

import './paginator.scss';

import { isNullOrEmpty, isNullOrUndefined } from '../../../../common/utils';

import { getPageNumbers, initNeighborsCount, initPageSize, pageSizeOptions, sizeClassNamesMap } from './utils';
import { PageInfo, PageSizeOption, PaginatorSize } from './types';

type PaginatorProps = {
    itemsCount: number;
    initPage?: number;
    size?: PaginatorSize;
    neighborsCount?: number;
    onPageChange: (pageInfo: PageInfo) => void;
};

type PaginatorState = {
    currentPage: number;
    pageSize: number;
    pagesCount: number;
};

export default function Paginator(props: PaginatorProps): JSX.Element {
    if (props.itemsCount <= 0) {
        throw new Error("[Paginator]: Props configuration error - Items count cannot be 0 or less.");
    }

    const pagesCount: number =
        Math.ceil(props.itemsCount / initPageSize);

    if (!isNullOrUndefined(props.initPage)
        && (props.initPage < 0 || props.initPage >= pagesCount)
    ) {
        throw new Error("[Paginator]: Props configuration error - Init page cannot be less than 0 or high than pages count.");
    }

    const [state, setState] = React.useState<PaginatorState>({
        currentPage: props.initPage || 0,
        pageSize: initPageSize,
        pagesCount: pagesCount
    });

    const onPageNumberClick = React.useCallback(
        (event: React.MouseEvent<HTMLUListElement, MouseEvent>): void => {
            if (!isNullOrUndefined(event.target)
                && event.target instanceof HTMLElement
            ) {
                const eventTarget: HTMLElement =
                    event.target as HTMLElement;

                if (!isNullOrUndefined(eventTarget.dataset['paginatorPage'])) {
                    const pageNumber: string | undefined =
                        eventTarget.dataset['paginatorPage'];

                    if (!isNullOrEmpty(pageNumber)) {
                        const parsedPageNumber: number =
                            parseInt(pageNumber);

                        setState({
                            ...state,
                            currentPage: parsedPageNumber
                        });

                        props.onPageChange({
                            start: parsedPageNumber * state.pageSize,
                            end: (parsedPageNumber + 1) * state.pageSize
                        });
                    }
                }
            }
        }, [props, state]);

    const onPageSizeChange = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>): void => {
            const selectedValue: string =
                event.target.value;

            if (!isNullOrEmpty(selectedValue)) {
                const pageSizeOption: PageSizeOption | undefined =
                    pageSizeOptions.find(x => x.id === selectedValue);

                if (!isNullOrUndefined(pageSizeOption)) {
                    const pagesCount: number =
                        Math.ceil(props.itemsCount / pageSizeOption.size);

                    let currentPage: number = state.currentPage;

                    if (pagesCount < currentPage) {
                        currentPage = pagesCount;
                    }

                    setState(({
                        currentPage: currentPage,
                        pageSize: pageSizeOption.size,
                        pagesCount: pagesCount
                    }));

                    // TODO: When change current page size: update current page items - resize it also
                }
            }
        }, [state, props]);

    const pageNumbers: Array<number> =
        getPageNumbers(state.currentPage, state.pagesCount, props.neighborsCount);

    const shouldShowArrows: boolean =
        state.pagesCount > (props.neighborsCount || initNeighborsCount) + 1;

    const canGoFirstPage: boolean =
        state.currentPage !== 0;

    const canGoLastPage: boolean =
        state.currentPage !== state.pagesCount;

    const onFirstPageButtonClick = React.useCallback(
        (): void => {
            if (canGoFirstPage && shouldShowArrows) {
                setState({
                    ...state,
                    currentPage: 0
                });

                props.onPageChange({
                    start: 0,
                    end: state.pageSize
                });
            }

        }, [canGoFirstPage, shouldShowArrows, state, props]);

    const onLastPageButtonClick = React.useCallback(
        (): void => {
            if (canGoLastPage && shouldShowArrows) {
                setState({
                    ...state,
                    currentPage: state.pagesCount
                });

                props.onPageChange({
                    start: (state.pagesCount - 1) * state.pageSize,
                    end: props.itemsCount
                });
            }

        }, [canGoLastPage, shouldShowArrows, state, props]);

    if (state.pagesCount === 1) {
        return (<></>);
    }

    const sizeClassName: string =
        ` ${sizeClassNamesMap.get(props.size || 'medium') || ''}`.trim();

    return (
        <section className="paginator">
            <div className="paginator__page-size">
                <label
                    className="paginator__page-size-label"
                    htmlFor="paginatorPageSize"
                >
                    Items per page
                </label>
                <select
                    id="paginatorPageSize"
                    className="paginator__page-size-selector form-control"
                    onChange={onPageSizeChange}
                >
                    {pageSizeOptions.map(option =>
                        <option
                            key={option.id}
                            value={option.id}
                        >
                            {option.size}
                        </option>
                    )}
                </select>
            </div>
            <div>
                <ul
                    className={`paginator__pagination pagination${sizeClassName}`}
                    onClick={onPageNumberClick}
                >
                    <li
                        className={`page-item${canGoFirstPage && shouldShowArrows ? '' : ' disabled'}`}
                        onClick={onFirstPageButtonClick}
                    >
                        <span className="page-link">
                            <i className="fas fa-angle-double-left"></i>
                        </span>
                    </li>
                    {pageNumbers.map(pageNumber =>
                        <li
                            key={pageNumber}
                            className={`page-item${state.currentPage === (pageNumber) ? ' active' : ''}`}
                        >
                            <span
                                className="page-link"
                                data-paginator-page={pageNumber}
                            >
                                {pageNumber + 1}
                            </span>
                        </li>
                    )}
                    <li
                        className={`page-item${canGoLastPage && shouldShowArrows ? '' : ' disabled'}`}
                        onClick={onLastPageButtonClick}
                    >
                        <span className="page-link">
                            <i className="fas fa-angle-double-right"></i>
                        </span>
                    </li>

                </ul>
            </div>
        </section>
    );
};