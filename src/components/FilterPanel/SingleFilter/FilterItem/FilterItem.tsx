import React from 'react';
import { TClusterItem } from '../../../../store/searchStore';
import cross from '../../../../static/icons/times-solid.svg';
import StyledFilterItem from './StyledFilterItem';

type TFilterItemProps = {
  className: string;
  clusterItem: TClusterItem;
  onClick: (url: string) => void;
};

const FilterItem = ({ clusterItem, className, onClick }: TFilterItemProps) => {
  return (
    <StyledFilterItem
      className={className}
      active={!!clusterItem.active}
      onClick={() => onClick(clusterItem.url)}
    >
      <span className="itemName">{clusterItem.name}</span>
      {clusterItem.active ? (
        <img src={cross} alt="cross" />
      ) : (
        <span className="count">{clusterItem.count}</span>
      )}
    </StyledFilterItem>
  );
};

export default FilterItem;
