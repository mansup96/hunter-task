import { AuthStore } from './authStore';
import { SearchStore } from './searchStore';

class RootStore {
  authStore: AuthStore;
  searchStore: SearchStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
  }
}

export default new RootStore();
