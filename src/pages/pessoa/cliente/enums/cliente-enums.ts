import { paths } from '@/routes/paths';

export const CLIENTE_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Clientes', disabled: true },
];

export const CLIENTE_BREADCRUMBS_LIST_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Clientes', disabled: false, href: paths.cliente.list },
  { title: 'Cadastrar', disabled: true },
];

export const CLIENTE_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Matrícula', key: 'matricula' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Telefone', key: 'telefone' },
  { title: 'Ações', key: 'actions', sortable: false },
];