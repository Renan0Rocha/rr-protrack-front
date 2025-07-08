export const paths = {
  dashboard: '/',

  pessoa: {
    cliente: {
      list: '/pessoa/cliente',
      new: '/pessoa/cliente/views/cliente-new',
      edit: (id: string | number) => `/pessoa/cliente/views/${id}`,
      view: (id: string | number) => `/pessoa/cliente/views/${id}/viewer`,
    },
    vendedor: {
      list: '/pessoa/vendedor',
      new: '/pessoa/vendedor/views/vendedor-new',
      edit: (id: string | number) => `/pessoa/vendedor/views/${id}`,
      view: (id: string | number) => `/pessoa/vendedor/views/${id}/viewer`,
    },
    fornecedor: {
      list: '/pessoa/fornecedor',
      new: '/pessoa/fornecedor/views/fornecedor-new',
      edit: (id: string | number) => `/pessoa/fornecedor/views/${id}`,
      view: (id: string | number) => `/pessoa/fornecedor/views/${id}/viewer`,
    }
  },

  programacao: {
    programa: {
      list: '/programacao/programa',
      new: '/programacao/programa/views/programa-new',
      edit: (id: string | number) => `/programacao/programa/views/${id}`,
      view: (id: string | number) => `/programacao/programa/views/${id}/viewer`,
    },
    ordemBloco: {
      list: '/programacao/ordem-bloco',
      new: '/programacao/ordem-bloco/views/ordem-bloco-new',
      edit: (id: string | number) => `/programacao/ordem-bloco/views/${id}`,
      view: (id: string | number) => `/programacao/ordem-bloco/views/${id}/viewer`,
    }
  }
};
