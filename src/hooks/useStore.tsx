import { useContext } from 'react';
import RootStore from '../store';
import { StoreContext } from '../components/StoreProvider/StoreProvider';

export const useStores = (): typeof RootStore => useContext(StoreContext);
