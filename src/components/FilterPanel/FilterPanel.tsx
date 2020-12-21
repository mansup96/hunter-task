import React from 'react';
import { TCluster, TQueryParams } from '../../store/searchStore';
import { observer } from 'mobx-react-lite';
import SingleFilter from './SingleFilter/SingleFilter';
import StyledFilterPanel from './StyledFilterPanel';

type TFilterPanelProps = {
  onFilterChanged: (updatedParams: Partial<TQueryParams>) => void;
  clusters: TCluster[];
};

const FilterPanel = ({ onFilterChanged, clusters }: TFilterPanelProps) => {
  return (
    <StyledFilterPanel>
      {clusters.map(cluster => (
        <SingleFilter
          key={cluster.id}
          cluster={cluster}
          onUpdate={onFilterChanged}
        />
      ))}
    </StyledFilterPanel>
  );
};

export default FilterPanel;
