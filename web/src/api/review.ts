import { connection } from './connection';

const prefix = '/review';

function getAll(params): Promise<AxiosResponse> {
  return connection().get(`${prefix}`, { params });
}

function getOne(id): Promise<AxiosResponse> {
  return connection().get(`${prefix}/${id}`);
}

function add(data): Promise<AxiosResponse> {
  return connection().post(`${prefix}`, { ...data });
}

function addReply(id, data): Promise<AxiosResponse> {
  return connection().post(`${prefix}/${id}/reply`, { ...data });
}

function edit(id, data): Promise<AxiosResponse> {
  return connection().patch(`${prefix}/${id}`, { ...data });
}

function remove(id): Promise<AxiosResponse> {
  return connection().delete(`${prefix}/${id}`);
}

export { getAll, getOne, add, addReply, edit, remove };
