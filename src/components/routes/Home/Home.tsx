import React from 'react';
import SearchLine from '../../common/SearchLine/SearchLine';
import { useHistory } from 'react-router-dom';
import { TQueryParams } from '../../../store/searchStore';

const Home = () => {
  const history = useHistory();
  const searchFor = 'vacancies';
  const submitHandler = ({ text }: Partial<TQueryParams>) => {
    history.push(`/search/${searchFor}?text=${text}`);
  };

  return (
    <SearchLine placeholder="Поиск по вакансиям" onSubmit={submitHandler} />
  );
};

export default Home;
