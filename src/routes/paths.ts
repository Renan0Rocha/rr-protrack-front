export const paths = {
    dashboard: '/',
    programa: {
      list: '/programa',
      new: '/programa/views/programa-new',
      edit: (id: string | number) => `/programa/views/${id}`,
      view: (id: string | number) => `/programa/views/${id}/viewer`,
    }
  };
  