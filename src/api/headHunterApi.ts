import axios from 'axios';

const hhAxios = axios.create({
  baseURL: 'https://api.hh.ru/',
});

const headHunterApi = {
  fetch: async (paramsString: string) => {
    try {
      return (await hhAxios.get(paramsString)).data;
    } catch (err) {
      console.log(err);
    }
  },

  getVacancy: async (id: string) => {
    try {
      return (await hhAxios.get(`vacancies/${id}`)).data;
    } catch (err) {
      console.log(err);
    }
  },

  getDictionaries: async () => {
    try {
      return (await hhAxios.get('/dictionaries')).data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default headHunterApi;
