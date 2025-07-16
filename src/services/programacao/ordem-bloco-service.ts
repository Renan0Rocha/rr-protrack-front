import { api } from '../config-service';

export const OrdemBlocoService = {
  async findAll() {
    const { data } = await api.get('/ordem-bloco');
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/ordem-bloco/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/ordem-bloco/${id}`, payload);
    return data;
  },
}
