import { action, makeObservable, observable } from 'mobx';
import headHunterApi from '../api/headHunterApi';

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
  branded_description: string;
  description: string;
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
    raw: string;
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

export class VacancyStore {
  constructor() {
    makeObservable(this, {
      vacancy: observable,
      getVacancy: action,
    });
  }

  vacancy: TVacancy | null = null;

  async getVacancy(id: string) {
    try {
      this.vacancy = await headHunterApi.getVacancy(id);
    } catch (err) {
      console.log(err);
    }
  }
}
