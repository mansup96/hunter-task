import React from 'react';
import { TClusterItem } from '../../../../store/searchStore';
import styled from 'styled-components';
import cross from '../../../../static/icons/times-solid.svg';

type TFilterItemProps = {
  className: string;
  clusterItem: TClusterItem;
  onClick: (url: string) => void;
};

const StyledFilterItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  cursor: pointer;
  font-weight: normal;
  font-size: 12px;
  width: 100%;
  background-color: ${({ active, theme }) =>
    active ? theme.gray : theme.white};

  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }

  .itemName {
    max-width: 130px;
  }

  .count {
    margin-left: auto;
  }

  img {
    margin-left: auto;
    width: 10px;
  }
`;

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
