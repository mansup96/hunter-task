import React, { FC, createContext, ReactNode, ReactElement } from 'react';
import RootStore from '../../store';

export const StoreContext = createContext<typeof RootStore>(
  {} as typeof RootStore
);

export type StoreComponent = FC<{
  store: typeof RootStore;
  children: ReactNode;
}>;

const StoreProvider: StoreComponent = ({ children, store }): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
