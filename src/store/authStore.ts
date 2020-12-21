import { action, computed, makeObservable, observable } from 'mobx';
import { fakeApi } from '../api/fakeApi';

export type TLoginFormData = {
  email: string;
  password: string;
};

export type TSignUpFormData = Omit<TLoginFormData, 'rememberMe'> & {
  name: string;
  passwordConfirmation: string;
};

type TMe = {
  id: string;
  name: string;
  email: string;
};

export class AuthStore {
  constructor() {
    makeObservable(this, {
      me: observable,
      login: action,
      signUp: action,
      isAuth: computed,
      checkMe: action,
      setMe: action,
      logout: action,
      isMeChecked: observable,
    });
    this.checkMe();
  }

  me: TMe | null = null;
  isMeChecked: boolean = false;

  checkMe() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.isMeChecked = true;
      return;
    }
    fakeApi
      .me(accessToken)
      .then(resp => {
        if (!resp?.data) throw new Error('Ошибка сервера');
        this.setMe(resp.data);
        this.isMeChecked = true;
      })
      .catch(error => console.log(error.data || error));
  }

  setMe(me: TMe | null) {
    this.me = me;
  }

  get isAuth() {
    if (this.me !== null) {
      return !!this.me.id;
    }
    return false;
  }

  get name() {
    if (this.me !== null) {
      return this.me.name;
    }
    return '';
  }

  async signUp(formData: TSignUpFormData) {
    try {
      await fakeApi.signUp(formData);
      return { success: true };
    } catch (error) {
      return { error: error.data, success: false };
    }
  }

  async login(formData: TLoginFormData) {
    try {
      const response = await fakeApi.login(formData);
      if (response) {
        const { accessToken, ...me } = response.data;
        localStorage.setItem('accessToken', accessToken);
        this.setMe(me);
        return { success: true };
      }
    } catch (error) {
      return error.data;
    }
  }

  logout = () => {
    this.setMe(null);
    localStorage.setItem('accessToken', '');
    fakeApi.logout();
  };
}
