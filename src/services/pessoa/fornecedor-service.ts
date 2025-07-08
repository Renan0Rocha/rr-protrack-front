import { api } from '../config-service';

export const FornecedorService = {
  async findAll() {
        const { data } = await api.get('/fornecedor');
    return data;
  },

  async create(payload: any) {
    const { data } = await api.post('/fornecedor', payload);
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/fornecedor/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/fornecedor/${id}`, payload);
    return data;
  },

  async delete(id: number | string) {
    const { data } = await api.delete(`/fornecedor/${id}`);
    return data;
  }
}
