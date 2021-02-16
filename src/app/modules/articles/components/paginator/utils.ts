import generateUid from "../../../../common/uid";

import { PageSizeOption, PaginatorSize } from "./types";

export const initPageSize: number = 10;
export const initNeighborsCount: number = 2;

export const pageSizeOptions: Array<PageSizeOption> = [
	{ id: generateUid(), size: initPageSize },
	{ id: generateUid(), size: 25 },
	{ id: generateUid(), size: 50 },
	{ id: generateUid(), size: 75 },
	{ id: generateUid(), size: 100 }
];

export const sizeClassNamesMap: Map<PaginatorSize, string> = new Map([
	['small', 'pagination-sm'],
	['medium', ''],
	['large', 'pagination-lg']
]);

export const getPageNumbers = (
	currentPage: number,
	pagesCount: number,
	neighborsCount: number = initNeighborsCount
): Array<number> => {
	if (currentPage > pagesCount) {
		throw new Error(`Paginator: Current page {${currentPage}} must be lower than pages count {${pagesCount}}.`);
	}

	if (pagesCount === 0) {
		return [];
	}

	const left: Array<number> =
		getLeftNumbers(currentPage, neighborsCount);

	const right: Array<number> =
		getRightNumbers(currentPage, pagesCount - 1, neighborsCount);

	return [...left, currentPage, ...right];
};

const getLeftNumbers = (max: number, count: number): Array<number> => {
	const result: Array<number> = [];

	if (max <= 0 || count <= 0) {
		return result;
	}

	for (let i = max - 1; i >= 0 && count > 0; i--, count--) {
		result.push(i);
	}

	return result.reverse();
};

const getRightNumbers = (min: number, max: number, count: number): Array<number> => {
	const result: Array<number> = [];

	if (max <= 0 || max === min || min >= max || count <= 0) {
		return result;
	}

	for (let i = min + 1; i <= max && count > 0; i++, count--) {
		result.push(i);
	}

	return result;
};