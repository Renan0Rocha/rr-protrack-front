import { paths } from '@/routes/paths';

export const FORNECEDOR_BREADCRUMBS_LIST = [
    { title: 'Início', disabled: false, href: paths.dashboard },
    { title: 'Fornecedores', disabled: true }
  ];
  
  export const FORNECEDOR_BREADCRUMBS_NEW_EDIT = [
    { title: 'Início', disabled: false, href: paths.dashboard },
    { title: 'Fornecedores', disabled: false, href: '/fornecedores' },
    { title: 'Cadastro', disabled: true }
  ];
  
  export const FORNECEDOR_TABLE_HEADERS = [
    { title: 'Nome', key: 'nome' },
    { title: 'CPF/CNPJ', key: 'cnpj' },
    { title: 'Contato', key: 'contato' },
    { title: 'E-mail', key: 'email' },
    { title: 'Ações', key: 'actions', sortable: false }
  ];
  