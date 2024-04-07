import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { trpcVanillaClient } from './trpc';

type ContextState = {
  isRestoreTriggered: boolean;
  isRestoring: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  tokenId: string | null;
  username: string | null;
};

const initialValue: ContextState = {
  isRestoreTriggered: false,
  isRestoring: false,
  isAuthenticating: false,
  isAuthenticated: false,
  tokenId: null,
  username: null,
};

type Credentials = {
  username: string;
  password: string;
};

type ContextType = {
  state: ContextState;
  restore: () => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
};

const throwError = async () => {
  throw new Error(`Cannot be called outside of a Context Provider`);
};

const AuthContext = createContext<ContextType>({
  state: initialValue,
  restore: throwError,
  login: throwError,
  logout: throwError,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ContextState>(initialValue);

  const update = (partial: Partial<ContextState>) => {
    setState((value) => ({ ...value, ...partial }));
  };

  const restore = async () => {
    update({ isRestoreTriggered: true });
    const tokenId = window.localStorage.getItem('TOKEN');
    if (tokenId === null) {
      throw new Error('No token');
    }
    update({ isRestoring: true });
    try {
      const accessToken = await trpcVanillaClient.tokens.fetchToken.query({
        id: tokenId,
      });
      update({ tokenId, username: accessToken.user.username });
    } catch (error) {
      window.localStorage.removeItem('TOKEN');
      throw error;
    } finally {
      update({ isRestoring: false });
    }
  };

  const login = async (credentials: Credentials) => {};

  const logout = async () => {
    if (!state.tokenId) return;
    await trpcVanillaClient.tokens.deleteToken.mutate({ id: state.tokenId });
    window.localStorage.removeItem('TOKEN');
    setState({ ...initialValue, isRestoreTriggered: true });
  };

  return (
    <AuthContext.Provider value={{ state, restore, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
