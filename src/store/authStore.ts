import { action, computed, makeObservable, observable } from 'mobx';
import { api, ValidationError } from '../api/api';

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
  me: TMe | null = null;

  constructor() {
    makeObservable(this, {
      me: observable,
      login: action,
      signUp: action,
      isAuth: computed,
      checkMe: action,
      setMe: action,
      logout: action,
    });
    this.checkMe();
  }

  async checkMe() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
      const response = await api.me(accessToken);
      if (!response?.data) throw new Error('Ошибка сервера');
      this.setMe(response.data);
    } catch (error) {
      console.log(error);
    }
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
      await api.signUp(formData);
      return Promise.resolve({ success: true });
    } catch (error) {
      return Promise.resolve({ error: error.data, success: false });
    }
  }

  async login(formData: TLoginFormData) {
    try {
      const response = await api.login(formData);
      if (response) {
        const { accessToken, ...me } = response.data;
        localStorage.setItem('accessToken', accessToken);
        this.setMe(me);
        return { success: true };
      }
    } catch (error) {
      console.log(error.data);
      return error.data;
    }
  }

  logout = () => {
    this.setMe(null);
    localStorage.setItem('accessToken', 'null');
  };
}
