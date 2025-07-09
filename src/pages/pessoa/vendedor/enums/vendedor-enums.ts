import { paths } from '@/routes/paths';

export const VENDEDOR_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Vendedores', disabled: true },
];

export const VENDEDOR_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Vendedores', disabled: false, href: paths.pessoa.vendedor.list },
  { title: 'Cadastrar', disabled: true },
];

export const VENDEDOR_TABLE_HEADERS = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Tipo', key: 'tipo' }, 
  { title: 'CPF/CNPJ', key: 'cpfCnpj' }, 
  { title: 'Telefone', key: 'telefone' },
  { title: 'Vendedor', key: 'vendedor.nome' },
  { title: 'Cidade', key: 'endereco.cidade' },
  { title: 'UF', key: 'endereco.estado' },
  { title: 'Ações', key: 'actions', sortable: false },
];
