import { api } from '../config-service';

export const VendedorService = {
  async findAll() {
        const { data } = await api.get('/vendedor');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/vendedor', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/vendedor/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/vendedor/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/vendedor/${id}`);
    return data;
  }
}
