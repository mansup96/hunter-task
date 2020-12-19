import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useQuery, useStores } from '../../../hooks';
import SearchLine from '../../SearchLine/SearchLine';
import { TSearchParamKeys } from '../../../store/searchStore';
import queryString from 'query-string';

const Search = ({ history, location, match }: RouteComponentProps) => {
  const { searchStore } = useStores();
  const { query } = useQuery();

  useEffect(() => {
    searchStore.fetch(location.search);
  }, [location,searchStore]);

  const queryParamsHandler = (value: string, searchParam: TSearchParamKeys) => {
    const paramsString = queryString.stringify({
      ...query,
      [searchParam]: value,
    });

    history.push(`${location.pathname}?${paramsString}`);
  };

  return (
    <main>
      <SearchLine
        text={typeof query.text === 'string' ? query.text : ''}
        onSubmit={queryParamsHandler}
        searchParam={'text'}
      />
    </main>
  );
};

export default withRouter(observer(Search));
