import { action, makeObservable, observable } from 'mobx';
import headHunterApi from '../api/headHunterApi';
import { string } from 'yup';

export type TSearchParamKeys = 'text' | 'area' | 'salary';

type TSearchParams = {
  text: string;
  area: string;
  salary: string;
};

type TMetro = {
  station_name: string;
  line_name: string;
  station_id: string;
  line_id: string;
  lat: number;
  lng: number;
};

type TEmployer = {
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

type TVacancy = {
  id: string;
  premium: boolean;
  name: string;
  area: {
    id: string;
    name: string;
    url: string;
  };
  salary: {
    from: number;
    to: number;
    currency: string;
    gross: boolean;
  };
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
    requirement: 'Опыт работы в сфере школьного образования от 3-х лет. Опыт организации и перспективного планирования учебной деятельности отделения. ';
    responsibility: 'Организация и контроль текущего и перспективного планирования учебной деятельности отделения. Создание и контроль условий для работы преподавательского состава Школы (включая...';
  };
  schedule: {
    id: 'fullDay' | 'shift' | 'flexible' | 'remote' | 'flyInFlyOut';
    name: string;
  };
  accept_temporary: boolean;
};

type TSearchResponseData = {
  found: number;
  page: number;
  per_page: number;
  pages: number;
  clusters: any;
  arguments: any;
  items: [] | TVacancy[];
};

export class SearchStore {
  constructor() {
    makeObservable(this, {
      items: observable,
      find: action,
      isFetching: observable,
      pagination: observable,
    });
  }
  searchFor = '/vacancies';
  isFetching = false;
  pagination = {
    found: 0,
    page: 0,
    per_page: 0,
    pages: 0,
  };
  items: TVacancy[] = [];

  async find(text: string) {}

  async fetch(paramsString: string) {
    try {
      this.isFetching = true;
      const responseData = (await headHunterApi.fetch(
        this.searchFor + paramsString
      )) as TSearchResponseData;
      console.log(responseData);
      const {
        items,
        pages,
        page,
        per_page,
        found,
      } = responseData;
      this.items = items;
      this.pagination = { pages, page, per_page, found };
      this.isFetching = false;
    } catch (err) {
      console.log(err);
    }
  }

  async getItems(params: string) {
    // await headHunterApi.getList(params);
  }
}
