import { authConnection } from './connection';

const prefix = '/user';

function register(data): Promise<AxiosResponse> {
  return authConnection().post(`${prefix}/register`, { ...data });
}

function login(data): Promise<AxiosResponse> {
  return authConnection().post(`${prefix}/login`, { ...data });
}

function edit(id, data): Promise<AxiosResponse> {
  return authConnection().patch(`${prefix}/${id}`, { ...data });
}

function remove(id): Promise<AxiosResponse> {
  return authConnection().delete(`${prefix}/${id}`);
}

export { register, login, edit, remove };
