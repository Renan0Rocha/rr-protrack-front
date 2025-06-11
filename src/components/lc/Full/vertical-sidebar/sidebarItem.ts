
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
  
  { header: 'Programação' },
  {
    title: 'Programas',
    icon: 'forbidden-circle-line-duotone',
    BgColor: 'success',
    to: '/programa'
  },
  {
    title: 'Ordem do Bloco',
    icon: 'archive-check-line-duotone',
    chip: '9',
    BgColor: 'error',
    chipColor: 'error',
    chipBgColor: 'error',
    chipVariant: 'flat',
    to: '/auth/404'
  }
];

export default sidebarItem;
