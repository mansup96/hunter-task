import { action, computed, makeObservable, observable } from 'mobx';

export interface StoreInterface extends Store {
  value: number;
  mappedVacancies: number;
  increase: () => void;
}

class Store implements StoreInterface {
  value = 0;
  constructor() {
    makeObservable(this, {
      value: observable,
      mappedVacancies: computed,
      increase: action,
    });
  }

  increase() {
    console.log('incr')
    this.value += 1;
  }

  get mappedVacancies() {
    console.log('comp')
    return this.value + 20;
  }
}

export default new Store();
