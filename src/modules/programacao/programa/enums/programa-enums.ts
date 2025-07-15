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
    { title: 'Horário Inicial', key: 'horario_inicial' },
    { title: 'Horário Final', key: 'horario_final' },
  { title: 'Ações', key: 'actions', sortable: false },
];

export enum DiasSemanaEnum {
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export const DIAS_SEMANA_OPTIONS = [
  { label: 'Segunda', value: DiasSemanaEnum.SEGUNDA },
  { label: 'Terça', value: DiasSemanaEnum.TERCA },
  { label: 'Quarta', value: DiasSemanaEnum.QUARTA },
  { label: 'Quinta', value: DiasSemanaEnum.QUINTA },
  { label: 'Sexta', value: DiasSemanaEnum.SEXTA },
  { label: 'Sábado', value: DiasSemanaEnum.SABADO },
  { label: 'Domingo', value: DiasSemanaEnum.DOMINGO },
];

