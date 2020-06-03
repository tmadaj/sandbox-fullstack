import store from '../store';
import { Theme, UserConfig } from '../reducers/config';

export const getTheme = (): Theme => store.getState().configReducer.theme;

export const getUserConfig = (): UserConfig => store.getState().configReducer;

export const getAccessToken = (): string => store.getState().configReducer.accessToken;

export const getRefreshToken = (): string => store.getState().configReducer.refreshToken;
