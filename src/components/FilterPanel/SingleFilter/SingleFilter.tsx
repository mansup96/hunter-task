import React, { useState } from 'react';
import queryString from 'query-string';
import angle from '../../../static/icons/angle-down-solid.svg';
import { observer } from 'mobx-react-lite';
import FilterItem from './FilterItem/FilterItem';
import StyledSingleFilter from './StyledSingleFilter';
import { TCluster, TQueryParams } from '../../../store/searchStore';

type TSingleFilterProps = {
  cluster: TCluster;
  onUpdate: (updatedParams: Partial<TQueryParams>) => void;
};

const checkCluster = (cluster: TCluster): boolean => {
  return (
    ['area', 'salary'].includes(cluster.id) ||
    cluster.items.some(item => item.active)
  );
};

const SingleFilter = ({ cluster, onUpdate }: TSingleFilterProps) => {
  const [isFullList, setIsFullList] = useState(false);
  const [isOpen, setIsOpen] = useState(checkCluster(cluster));

  const clickHandler = (url: string) => {
    console.log(url);
    const parsedUrl = queryString.parseUrl(url);
    onUpdate(parsedUrl.query);
  };

  return (
    <StyledSingleFilter isOpen={isOpen}>
      <div className="filterSpoiler" onClick={() => setIsOpen(!isOpen)}>
        <p className="filterName">{cluster.name}</p>
        <img className="angle" src={angle} alt="angle" />
      </div>
      <ul className="filterList">
        {cluster.items.map((item, index) => {
          return isFullList ? (
            <FilterItem
              key={item.name}
              clusterItem={item}
              className="filterItem"
              onClick={clickHandler}
            />
          ) : (
            index <= 4 && (
              <FilterItem
                key={item.name}
                clusterItem={item}
                className="filterItem"
                onClick={clickHandler}
              />
            )
          );
        })}

        {!isFullList && cluster.items.length > 5 && (
          <span className="restItems" onClick={() => setIsFullList(true)}>
            Еще {cluster.items.length - 5}
          </span>
        )}
      </ul>
    </StyledSingleFilter>
  );
};

export default observer(SingleFilter);
