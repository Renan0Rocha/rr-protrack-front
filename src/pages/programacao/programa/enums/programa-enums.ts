import { paths } from '@/routes/paths';

export const PROGRAMA_BREADCRUMBS_LIST = [
    { title: 'Início', disabled: false, href: paths.dashboard },
    { title: 'Programas', disabled: true }
  ];
  
  export const PROGRAMA_BREADCRUMBS_NEW_EDIT = [
    { title: 'Início', disabled: false, href: paths.dashboard },
    { title: 'Programas', disabled: false, href: '/programa' },
    { title: 'Cadastro', disabled: true }
  ];
  
  export const PROGRAMA_TABLE_HEADERS = [
    { title: 'Nome', key: 'nome' },
    { title: 'Sigla', key: 'sigla' },
    { title: 'Tipo', key: 'tipo' },
    { title: 'Status', key: 'status' },
    { title: 'Ações', key: 'actions', sortable: false }
  ];
  