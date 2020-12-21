import { action, makeObservable, observable } from 'mobx';
import headHunterApi from '../api/headHunterApi';
import queryString from 'query-string';
import { TVacancy } from './vacancyStore';

export type TClusterGroups = {
  area: string;
  salary: string;
  specialization: string;
  industry: string;
  metro: string;
  professional_area: string;
  sub_industry: string;
  experience: string;
  employment: string;
  schedule: string;
  label: string;
};

export type TQueryParams = TClusterGroups & {
  clusters: boolean;
  describe_arguments: boolean;
  text: string;
  page: string;
};

export type TSearchFor = 'vacancies' | 'resume' | 'employers';

export type TPagination = {
  found: number;
  page: number;
  per_page: number;
  pages: number;
};

export type TArgument = {
  argument: string;
  value: string;
  value_description: string | null;
  disable_url: string;
  cluster_group: {
    id: string;
    name: string;
  };
};

export type TCluster = {
  id: string;
  name: string;
  items: TClusterItem[];
};

export type TClusterItem = {
  name: string;
  argument?: string;
  url: string;
  count?: number;
  active?: boolean;
};

export type TSearchResponseData = {
  found: number;
  page: number;
  per_page: number;
  pages: number;
  clusters: TCluster[];
  arguments: TArgument[];
  items: [] | TVacancy[];
};

export class SearchStore {
  constructor() {
    makeObservable(this, {
      items: observable,
      isFetching: observable,
      pagination: observable,
      fetch: action,
      setItems: action,
      clusters: observable,
      transformClusters: action,
      setPagination: action,
      setFetching: action,
    });
  }
  isFetching = false;
  clusters: TCluster[] = [];
  pagination = {
    found: 0,
    page: 0,
    per_page: 0,
    pages: 0,
  };
  items: TVacancy[] = [];

  arguments: any | null = null;

  setFetching(flag: boolean) {
    this.isFetching = flag;
  }

  setArguments(args: TArgument[]) {
    this.arguments = args;
  }

  setItems(items: TVacancy[]) {
    this.items = items;
  }

  setPagination(pagination: TPagination) {
    this.pagination = pagination;
  }

  setClusters(clusters: TCluster[]) {
    this.clusters = clusters;
  }

  transformClusters(args: TArgument[], clusters: TCluster[]) {
    if (!args) this.setClusters(clusters);

    args.forEach(arg => {
      if (arg.cluster_group && arg.value_description) {
        const activeClusterItem = {
          active: true,
          name: arg.value_description,
          argument: arg.argument,
          url: arg.disable_url,
        };
        const cluster = clusters.find(
          cluster => cluster.id === arg.cluster_group.id
        );
        if (cluster) cluster.items.unshift(activeClusterItem);
        else
          clusters.unshift({
            id: arg.cluster_group.id,
            name: arg.cluster_group.name,
            items: [activeClusterItem],
          });
      }
    });

    this.setClusters(clusters);
  }

  async fetch(queryObj: Partial<TQueryParams>, path: string) {
    try {
      this.setFetching(true);
      queryObj = {
        ...queryObj,
        describe_arguments: true,
        clusters: true,
        page: queryObj.page ? queryObj.page : '0',
      };

      const currentSearch = queryString.stringify(queryObj);

      const responseData = (await headHunterApi.fetch(
        '/' + path + '?' + currentSearch
      )) as TSearchResponseData;

      const { items, pages, page, per_page, found, clusters } = responseData;
      this.transformClusters(responseData.arguments, clusters);
      this.setItems(items);
      this.setPagination({ pages, page, per_page, found });

      this.setFetching(false);
    } catch (err) {
      console.log(err);
    }
  }
}
