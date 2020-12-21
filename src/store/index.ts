import { AuthStore } from './authStore';
import { SearchStore } from './searchStore';
import { VacancyStore } from './vacancyStore';

class RootStore {
  authStore: AuthStore;
  searchStore: SearchStore;
  vacancyStore: VacancyStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
    this.vacancyStore = new VacancyStore();
  }
}

export default new RootStore();
