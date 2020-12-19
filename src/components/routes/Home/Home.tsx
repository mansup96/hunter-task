import React from 'react';
import SearchLine from '../../SearchLine/SearchLine';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const submitHandler = (text: string) => {
    console.log(text);
    history.push(`/search/vacancies?text=${text}`);
  };

  return (
    <main>
      {/*todo: Enter press search*/}
      <SearchLine onSubmit={submitHandler} searchParam={'text'} />
    </main>
  );
};

export default Home;
