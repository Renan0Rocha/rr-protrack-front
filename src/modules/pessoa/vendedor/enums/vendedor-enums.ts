import { paths } from '@/routes/paths';

export const VENDEDOR_BREADCRUMBS_LIST = [
  { title: 'Início', disabled: false, href: paths.dashboard },
  { title: 'Vendedores', disabled: true },
];

export const VENDEDOR_BREADCRUMBS_NEW_EDIT = [
  { title: 'Início', disabled: false, href: paths.dashboard },
  { title: 'Vendedores', disabled: false, href: paths.pessoa.vendedor.list },
  { title: 'Cadastrar', disabled: true },
];

export const VENDEDOR_TABLE_HEADERS = [
  { title: 'Nome', key: 'nome' },
  { title: 'Vínculo', key: 'vinculo' }, 
  { title: 'CPF', key: 'cpf' }, 
  { title: 'Data de nascimento', key: 'dataNascimento' },
  { title: 'Ações', key: 'actions', sortable: false },
];
