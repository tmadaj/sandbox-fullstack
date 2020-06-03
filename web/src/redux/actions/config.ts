import { bindActionCreators } from 'redux';
import store from '../store';
import { ConfigAction, LoginCredentials, Theme, UserConfig } from '../reducers/config';

const setThemeCreator = (payload: Theme): ConfigAction => ({ type: 'SET_THEME', payload });

const setUserConfigCreator = (payload: UserConfig): ConfigAction => ({
  type: 'SET_USER_CONFIG',
  payload,
});

const loginCreator = (payload: LoginCredentials): ConfigAction => ({
  type: 'LOGIN',
  payload,
});
const logoutCreator = (): ConfigAction => ({ type: 'LOGOUT' });

const boundActions = bindActionCreators(
  {
    setTheme: setThemeCreator,
    setUserConfig: setUserConfigCreator,
    login: loginCreator,
    logout: logoutCreator,
  },
  store.dispatch,
);

export const { setTheme, setUserConfig, login, logout } = boundActions;
