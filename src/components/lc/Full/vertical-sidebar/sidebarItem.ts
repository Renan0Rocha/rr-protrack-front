
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
  { header: 'Starterkit' },
  {
    title: "Página Inicial",
    icon: 'screencast-2-linear',
    BgColor: 'primary',
    to: "/",
  },
  
  { header: 'Others' },
  {
    title: 'Contratos',
    icon: 'double-alt-arrow-down-bold-duotone',
    BgColor: 'secondary',
    to: '#',
    children: [
      {
        title: 'Nível 1', 
        to: '/auth/404'
      },
      {
        title: 'Nível 1',
        to: '/auth/404',
        children: [
          {
            title: 'Nível 2',
  
            to: '/auth/404'
          },
          {
            title: 'Nível 2',
  
            to: '/auth/404',
            children: [
              {
                title: 'Nível 3',
      
                to: '/auth/404'
              },
              {
                title: 'Nível 3',
      
                to: '/auth/404'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Desabilitado',
    icon: 'forbidden-circle-line-duotone',
    BgColor: 'success',
    disabled: true,
    to: '/auth/404'
  },
  {
    title: 'Subtítulo',
    BgColor: 'warning',
    icon: 'square-academic-cap-line-duotone',
    subCaption: 'This is the subtitle',
    to: '/auth/404'
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
  },
  {
    title: 'Outlined',
    icon: 'smile-circle-line-duotone',
    chip: 'outline',
    chipColor: 'indigo',
    chipVariant: 'outlined',
    BgColor: 'indigo',
    to: '/auth/404'
  },
  {
    title: 'Link Externo',
    icon: 'link-bold-duotone',
    BgColor: 'info',
    to: '/auth/404',
    type: 'external'
  }

];

export default sidebarItem;
