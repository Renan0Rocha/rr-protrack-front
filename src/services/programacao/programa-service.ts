import { api } from '../config-service';

export const ProgramaService = {
  async findAll() {
    const { data } = await api.get('/programa');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/programa', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/programa/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/programa/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/programa/${id}`);
    return data;
  }
}
