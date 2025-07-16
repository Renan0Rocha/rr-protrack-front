import { api } from '../config-service';

export const InsercaoService = {
  async findAll() {
    const { data } = await api.get('/insercao');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/insercao', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/insercao/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/insercao/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/insercao/${id}`);
    return data;
  }
}
