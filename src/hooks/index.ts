import { useContext } from 'react';
import RootStore from '../store';
import { StoreContext } from '../components/StoreProvider/StoreProvider';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const useStores = (): typeof RootStore => useContext(StoreContext);

export const useQuery = () => queryString.parseUrl(useLocation().search);
