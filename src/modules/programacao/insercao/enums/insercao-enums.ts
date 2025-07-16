import { paths } from '@/routes/paths';

export const INSERCAO_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Inserções', disabled: true },
];

export const INSERCAO_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Inserções', disabled: false, href: paths.programacao.insercao.list },
  { title: 'Cadastrar', disabled: true },
];

export const INSERCAO_TABLE_HEADERS = [
  { title: 'Valor', key: 'valor' },
  { title: 'Tempo', key: 'tempo' }, 
  { title: 'Ações', key: 'actions', sortable: false },
];


