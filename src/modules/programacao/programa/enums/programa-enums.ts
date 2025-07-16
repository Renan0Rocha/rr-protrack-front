import { paths } from '@/routes/paths';

export const PROGRAMA_BREADCRUMBS_LIST = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Programas', disabled: true },
];

export const PROGRAMA_BREADCRUMBS_NEW_EDIT = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Programas', disabled: false, href: paths.programacao.programa.list },
  { title: 'Cadastrar', disabled: true },
];

export const PROGRAMA_TABLE_HEADERS = [
  { title: 'Nome', key: 'nome' },
  { title: 'Sigla', key: 'sigla' }, 
  { title: 'Duração', key: 'duracao' }, 
  { title: 'Dias da Semana', key: 'diasSemana' },
    { title: 'Horário Inicial', key: 'horarioInicio' },
    { title: 'Horário Final', key: 'horarioFim' },
  { title: 'Ações', key: 'actions', sortable: false },
];


