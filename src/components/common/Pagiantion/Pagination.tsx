import React from 'react';
import { TPagination, TQueryParams } from '../../../store/searchStore';
import StyledPagination from './StyledPagination';

type TPaginationProps = TPagination & {
  onPageChange: (page: string) => void;
};

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const getPagesRange = (page: number, pagesAmount: number) => {
  const pageNeighbours = 2;

  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (pagesAmount > totalBlocks) {
    const startPage = Math.max(2, page - pageNeighbours);
    const endPage = Math.min(pagesAmount - 1, page + pageNeighbours);
    let pages: any[] = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = pagesAmount - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ['', ...extraPages, ...pages];
        break;
      }

      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, ''];
        break;
      }

      case hasLeftSpill && hasRightSpill:
      default: {
        pages = ['', ...pages, ''];
        break;
      }
    }

    return [1, ...pages, pagesAmount];
  }

  return range(1, pagesAmount);
};

const Pagination = React.memo(
  ({ page, pages, onPageChange }: TPaginationProps) => {
    const pagesRange = getPagesRange(page + 1, pages);

    const clickHandler = (page: number) => {
      onPageChange((page - 1).toString());
    };

    return (
      <StyledPagination>
        {pagesRange &&
          pagesRange.map((p, index) => {
            return typeof p === 'number' ? (
              <li
                key={index}
                onClick={p === page + 1 ? undefined : () => clickHandler(p)}
                className={`page ${p === page + 1 ? 'page--active' : ''} `}
              >
                {p}
              </li>
            ) : (
              <li key={index} className="empty">
                ...
              </li>
            );
          })}
      </StyledPagination>
    );
  }
);

export default Pagination;
