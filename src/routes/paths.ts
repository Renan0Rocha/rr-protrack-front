export const paths = {
    dashboard: '/',
    programa: {
      list: '/programa',
      new: '/programa/views/programa-new',
      edit: (id: string | number) => `/programa/views/${id}`,
      view: (id: string | number) => `/programa/views/${id}/viewer`,
  }
    ,
    fornecedor: {
      list: '/fornecedor',
      new: '/fornecedor/views/fornecedor-new',
      edit: (id: string | number) => `/fornecedor/views/${id}`,
      view: (id: string | number) => `/fornecedor/views/${id}/viewer`,
    }
  };
  