import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import { TQueryParams } from '../../../store/searchStore';
import StyledSearchLine from './StyledSearchLine';

type TSearchLineProps = {
  onSubmit: (updatedParams: Partial<TQueryParams>) => void;
  placeholder?: string;
  text?: string;
};

const SearchLine = ({ onSubmit, text, placeholder }: TSearchLineProps) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (text) {
      setCurrentText(text);
    }
  }, [text]);

  const clickHandler = () => {
    onSubmit({ text: currentText, page: '0' });
  };

  const keyPressHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') onSubmit({ text: currentText, page: '0' });
  };

  return (
    <StyledSearchLine>
      <div className="container">
        <input
          onKeyDown={keyPressHandler}
          placeholder={placeholder}
          className="searchInput"
          value={currentText}
          onChange={e => setCurrentText(e.target.value)}
        />
        <button className="searchBtn" onClick={() => clickHandler()}>
          Найти
        </button>
      </div>
    </StyledSearchLine>
  );
};

export default SearchLine;
