import { api } from '../config-service';

export const OrdemBlocoContratoService = {
  async findAll() {
    const { data } = await api.get('/ordem-bloco-contrato');
    return data;
  },

  async findOneById(id: number | string) {
    const { data } = await api.get(`/ordem-bloco-contrato/${id}`);
    return data;
  },

  async update(id: number | string, payload: any) {
    const { data } = await api.put(`/ordem-bloco-contrato/${id}`, payload);
    return data;
  },
}
