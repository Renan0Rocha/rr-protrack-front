import { api } from '../config-service';

export const ClienteService = {
  async findAll() {
        const { data } = await api.get('/cliente');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/cliente', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/cliente/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/cliente/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/cliente/${id}`);
    return data;
  }
}
