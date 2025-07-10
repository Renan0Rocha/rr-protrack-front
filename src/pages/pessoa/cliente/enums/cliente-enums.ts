import { paths } from '~/routes/paths';

export const CLIENTE_BREADCRUMBS_LIST = [
  { title: 'Início', disabled: false, href: paths.dashboard },
  { title: 'Clientes', disabled: true },
];

export const CLIENTE_BREADCRUMBS_NEW_EDIT = [
  { title: 'Início', disabled: false, href: paths.dashboard },
  { title: 'Clientes', disabled: false, href: paths.pessoa.cliente.list },
  { title: 'Cadastrar', disabled: true },
];

export const CLIENTE_TABLE_HEADERS = [
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
