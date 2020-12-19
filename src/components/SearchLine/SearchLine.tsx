import React, { useEffect, useState } from 'react';
import Input from '../common/Input/Input';
import { TSearchParamKeys } from '../../store/searchStore';

type TSearchLineProps = {
  onSubmit: (text: string, searchParam: TSearchParamKeys) => void;
  searchParam: TSearchParamKeys;
  text?: string;
};

const SearchLine = ({ onSubmit, text, searchParam }: TSearchLineProps) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (text) {
      setCurrentText(text);
    }
  }, [text]);

  const clickHandler = () => {
    onSubmit(currentText, searchParam);
  };

  return (
    <div>
      <Input value={currentText} onChangeValue={setCurrentText} />
      <button onClick={() => clickHandler()}>Найти</button>
    </div>
  );
};

export default SearchLine;
