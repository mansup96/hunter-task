import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useStores } from '../../../hooks';
import SearchLine from '../../common/SearchLine/SearchLine';
import { TSearchFor, TQueryParams } from '../../../store/searchStore';
import queryString from 'query-string';
import List from '../../List/List';
import Info from '../../Info/Info';
import Pagination from '../../common/Pagiantion/Pagination';
import FilterPanel from '../../FilterPanel/FilterPanel';
import styled from 'styled-components';

const StyledSearch = styled.div`
  max-width: 100%;
  padding-bottom: 50px;

  .contentWrapper {
    display: flex;
  }
`;

type TRouteParams = {
  searchFor: TSearchFor;
};

const Search = () => {
  const { searchStore } = useStores();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const { searchFor } = useParams<TRouteParams>();
  const { query } = useMemo(() => queryString.parseUrl(search), [search]);
  useEffect(() => {
    searchStore.fetch(query, searchFor);
  }, [searchStore, query, searchFor]);

  const queryParamsHandler = (updatedParams: Partial<TQueryParams>) => {
    if (!updatedParams.page) updatedParams.page = '0';
    const paramsString = queryString.stringify(updatedParams);

    history.push(`${pathname}?${paramsString}`);
  };

  const handlePage = (page: string) => {
    const paramsString = queryString.stringify({ ...query, page });
    history.push(`${pathname}?${paramsString}`);
  };

  return (
    <StyledSearch>
      <SearchLine
        text={typeof query.text === 'string' ? query.text : ''}
        onSubmit={queryParamsHandler}
      />
      <Pagination {...searchStore.pagination} onPageChange={handlePage} />
      {!!searchStore.pagination.found && (
        <Info amount={searchStore.pagination.found} type={searchFor} />
      )}
      <>
        <div className="contentWrapper">
          <FilterPanel
            clusters={searchStore.clusters}
            onFilterChanged={queryParamsHandler}
          />
          {!searchStore.isFetching && (
            <List items={searchStore.items} itemType={searchFor} />
          )}
        </div>
        <Pagination {...searchStore.pagination} onPageChange={handlePage} />
      </>
    </StyledSearch>
  );
};

export default observer(Search);
