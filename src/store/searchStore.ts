import { action, makeObservable, observable } from 'mobx';
import headHunterApi from '../api/headHunterApi';
import queryString from 'query-string';

export type TClusters = {
  area: string;
  salary: string;
  clusters: boolean;
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

export type TQueryParams = TClusters & {
  text: string;
  page: string;
  describe_arguments: boolean;
};

export type TSearchFor = 'vacancies' | 'resume' | 'employers';

export type TPagination = {
  found: number;
  page: number;
  per_page: number;
  pages: number;
};

export type TMetro = {
  station_name: string;
  line_name: string;
  station_id: string;
  line_id: string;
  lat: number;
  lng: number;
};

export type TEmployer = {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls: {
    90: string;
    240: string;
    original: string;
  };
  vacancies_url: string;
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

export type TSalary = {
  from: number;
  to: number;
  currency: string;
  gross: boolean;
};

export type TVacancy = {
  id: string;
  premium: boolean;
  name: string;
  area: {
    id: string;
    name: string;
    url: string;
  };
  salary: TSalary;
  type: {
    id: string;
    name: string;
  };
  address: {
    city: string;
    street: string;
    building: string;
    description: string;
    lat: number;
    lng: number;
    metro: TMetro;
    metro_stations: TMetro[];
  };
  sort_point_distance: null;
  employer: TEmployer;
  published_at: string;
  apply_alternate_url: string;
  url: string;
  alternate_url: string;
  snippet: {
    requirement: string;
    responsibility: string;
  };
  schedule: {
    id: 'fullDay' | 'shift' | 'flexible' | 'remote' | 'flyInFlyOut';
    name: string;
  };
  accept_temporary: boolean;
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
      this.isFetching = true;
      console.log(queryString.stringify(queryObj));
      queryObj = {
        ...queryObj,
        describe_arguments: true,
        clusters: true,
        page: queryObj.page ? queryObj.page : '0',
      };
      const responseData = (await headHunterApi.fetch(
        '/' + path + '?' + queryString.stringify(queryObj)
      )) as TSearchResponseData;
      const { items, pages, page, per_page, found, clusters } = responseData;
      this.transformClusters(responseData.arguments, clusters);
      this.setItems(items);
      this.setPagination({ pages, page, per_page, found });
      this.isFetching = false;
    } catch (err) {
      console.log(err);
    }
  }
}
