import { HistoryLocationState } from 'react-router-dom';
import { logout } from 'src/redux/actions';

export default (err: AxiosError, history: HistoryLocationState): void => {
  if (err?.response?.status === 401) {
    logout(); // if there is a token, it's expired
    history.push('/login');
  }
};
