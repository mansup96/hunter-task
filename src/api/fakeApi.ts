import mockedAxios, { FORBIDDEN } from './fakeServer';
import { TLoginFormData, TSignUpFormData } from '../store/authStore';
import { log } from 'util';

export class ValidationError extends Error {
  data: { [key: string]: string };
  constructor(data: { [key: string]: string }) {
    super('Ошибка валидации');
    this.data = data;
  }
}

export const fakeApi = {
  login: async (formData: TLoginFormData) => {
    try {
      return await mockedAxios.post('/login', formData);
    } catch (error) {
      if (error.response.status === FORBIDDEN) {
        throw new ValidationError(error.response.data);
      } else {
        console.log(error);
      }
    }
  },

  signUp: async (formData: TSignUpFormData) => {
    try {
      return await mockedAxios.post('/sign_up', formData);
    } catch (error) {
      if (error.response.status === FORBIDDEN) {
        throw new ValidationError(error.response.data);
      } else {
        console.log(error);
      }
    }
  },

  me: async (token: string) => {
    try {
      return await mockedAxios.post('/me', token);
    } catch (error) {
      if (error.response.status === FORBIDDEN) {
        throw new ValidationError(error.response.data);
      } else {
        console.log(error);
      }
    }
  },

  logout: () => {
    mockedAxios.post('/logout').catch(err => console.log(err));
  },
};
