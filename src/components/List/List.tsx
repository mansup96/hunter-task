import React from 'react';
import { TSearchFor, TVacancy } from '../../store/searchStore';
import { observer } from 'mobx-react-lite';
import VacancyItem from './VacancyItem/VacancyItem';
import StyledList from './StyledList';

type TList<T = TVacancy> = {
  items: T[];
  itemType: TSearchFor;
};

const List = ({ items, itemType }: TList) => {
  const ListItem = (item: TVacancy) => {
    if (itemType === 'vacancies')
      return <VacancyItem key={item.id} item={item} />;
  };

  return <StyledList>{items.map(item => ListItem(item))}</StyledList>;
};

export default observer(List);
