export type Theme = 'dark' | 'light';

type UserRole = 'regular' | 'owner' | 'admin';

export interface LoginCredentials {
  language?: string;
  logo?: string;
  theme?: Theme;
  userId: string;
  displayName: string;
  role: UserRole;
  accessToken: string;
  refreshToken?: string;
}

interface ConfigState {
  language: string;
  logo: string;
  theme: Theme;
  userId: string;
  displayName: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}

export type UserConfig = ConfigState;

export interface ConfigAction {
  type: string;
  payload: Theme | LoginCredentials | UserConfig | Error;
  error: boolean;
}

const defaultConfigState: ConfigState = {
  language: 'en',
  logo: '',
  theme: 'light',
  userId: '',
  displayName: '',
  role: 'regular',
  accessToken: '',
  refreshToken: '',
};

export function configReducer(
  state: ConfigState = defaultConfigState,
  action: ConfigAction,
): ConfigState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_USER_CONFIG':
      return { ...state, ...action.payload };

    case 'LOGIN':
      return { ...state, ...action.payload };

    case 'LOGOUT':
      return defaultConfigState;

    default:
      return state;
  }
}
