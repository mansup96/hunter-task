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
};

export default headHunterApi;
