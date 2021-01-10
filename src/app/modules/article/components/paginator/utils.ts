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
	neighborsCount: number = 2
): Array<number> => {
	if (currentPage > pagesCount) {
		throw new Error(`Paginator: Current page {${currentPage}} must be lower than pages count {${pagesCount}}.`);
	}

	if (pagesCount === 0) {
		return [];
	}

	if (currentPage <= 0) {
		return new Array(neighborsCount + 1)
			.fill(0)
			.map((_, i) => i);
	}

	if (currentPage === pagesCount) {
		return new Array(neighborsCount + 1)
			.fill(pagesCount)
			.map((_, i) => pagesCount - i)
			.reverse();
	}

	const left: Array<number> =
		new Array(neighborsCount + 1)
			.fill(currentPage)
			.map((_, i) => currentPage - i)
			.filter((_, i) => i !== 0)
			.reverse()
			.filter(x => x >= 0 && x <= pagesCount);

	const right: Array<number> =
		new Array(neighborsCount + 1)
			.fill(currentPage)
			.map((_, i) => currentPage + i)
			.filter((_, i) => i !== 0)
			.filter(x => x >= 0 && x <= pagesCount);

	return [...left, currentPage, ...right];
};