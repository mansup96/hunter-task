import axios from 'axios';

const hhAxios = axios.create({
  baseURL: 'https://api.hh.ru/',
});

axios
  .get('/')
  .then(resp => console.log(resp))
  .catch(err => console.log(err.response));

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
