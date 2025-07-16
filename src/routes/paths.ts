export const paths = {
  dashboard: '/',

  pessoa: {
    cliente: {
     list: '/pessoa/cliente',                      
      new:  '/pessoa/cliente/new',                 
      edit: (id: string|number) => `/pessoa/cliente/${id}/edit`,      
      view: (id: string|number) => `/pessoa/cliente/${id}/viewer`,    
    },
    vendedor: {
      list: '/pessoa/vendedor',                      
      new:  '/pessoa/vendedor/new',                 
      edit: (id: string|number) => `/pessoa/vendedor/${id}/edit`,      
      view: (id: string|number) => `/pessoa/vendedor/${id}/viewer`,    
    },
  },

  programacao: {
    programa: {
      list: '/programacao/programa',
      new:  '/programacao/programa/new',
      edit: (id: string | number) => `/programacao/programa/${id}/edit`,
      view: (id: string | number) => `/programacao/programa/${id}/viewer`,
    },
    ordemBloco: {
      list: '/programacao/ordem-bloco',
      new: '/programacao/ordem-bloco/views/ordem-bloco-new',
      edit: (id: string | number) => `/programacao/ordem-bloco/views/${id}`,
      view: (id: string | number) => `/programacao/ordem-bloco/views/${id}/viewer`,
    },
    insercao: {
      list: '/programacao/insercao',
      new:  '/programacao/insercao/new',
      edit: (id: string | number) => `/programacao/insercao/${id}/edit`,
      view: (id: string | number) => `/programacao/insercao/${id}/viewer`,
    },
    contrato: {
      list: '/programacao/contrato',
      new:  '/programacao/contrato/new',
      edit: (id: string | number) => `/programacao/contrato/${id}/edit`,
      view: (id: string | number) => `/programacao/contrato/${id}/viewer`,
    },
  }
};
