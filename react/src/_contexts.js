import { createContext } from 'react';

export const PageChangerContext = createContext({
  changePage: page => {},
});
