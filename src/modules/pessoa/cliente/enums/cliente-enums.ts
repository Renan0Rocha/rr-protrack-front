import { paths } from '@/routes/paths';

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
  { title: 'Nome', key: 'nome' },
  { title: 'CPF/CNPJ', key: 'cpfCnpj' }, 
  { title: 'Telefone', key: 'telefone' },
  { title: 'Cep', key: 'endereco.cep' },
  { title: 'Cidade', key: 'endereco.cidade' },
  { title: 'Estado', key: 'endereco.estado' },
  { title: 'Vendedor Vinculado', key: 'vendedor.nome' },
  { title: 'Ações', key: 'actions', sortable: false },
];
