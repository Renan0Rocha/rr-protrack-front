import { paths } from '@/routes/paths';

export const CONTRATO_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Inserções', disabled: true },
];

export const CONTRATO_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Inserções', disabled: false, href: paths.programacao.contrato.list },
  { title: 'Cadastrar', disabled: true },
];

export const CONTRATO_TABLE_HEADERS = [
  { title: 'Cliente', key: 'cliente.nome' },
  { title: 'Vendedor', key: 'vendedor.nome' },
  { title: 'Número de Documento', key: 'numeroDocumento' },
  { title: 'Data de Início', key: 'dataInicio' },
  { title: 'Data de Fim', key: 'dataFim' },
  { title: 'Situação', key: 'situacao' },
  { title: 'Valor Total', key: 'valorTotal' },
  { title: 'Ações', key: 'actions', sortable: false },
];


