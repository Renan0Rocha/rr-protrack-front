import { paths } from '@/routes/paths';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Início' },
  {
    title: "Página Inicial",
    icon: 'screencast-2-linear',
    BgColor: 'primary',
    to: "/",
  },
  { header: 'Pessoas' },
  {
    title: 'Fornecedores',
    icon: 'garage-outline',
    BgColor: 'success',
    to: paths.fornecedor.list
  },
  { header: 'Programação' },
  {
    title: 'Programas',
    icon: 'radio-minimalistic-linear',
    BgColor: 'success',
    to: paths.programa.list
  },
  {
    title: 'Ordem do Bloco',
    icon: 'bill-list-linear',
    chip: '9',
    BgColor: 'error',
    chipColor: 'error',
    chipBgColor: 'error',
    chipVariant: 'flat',
    to: '/auth/404'
  }
];

export default sidebarItem;
