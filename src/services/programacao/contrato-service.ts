import { api } from '../config-service';

export const ContratoService = {
  async findAll() {
    const { data } = await api.get('/contrato');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/contrato', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/contrato/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/contrato/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/contrato/${id}`);
    return data;
  }
}
