import { api } from './config-service';

export const ProgramaService = {
  async findAll() {
    const { data } = await api.get('/programas');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/programas', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/programas/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/programas/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/programas/${id}`);
    return data;
  }
}
