import { ITableColumn } from "@core/interfaces/table.interface";

export const PATH_SERVICE: any = {
  login: '/auth/v1/token?grant_type=password',
  user: '/rest/v1/usuario?uid=eq.',
  userId: '/rest/v1/usuario?id=eq.',
  userList: '/rest/v1/usuario',
  userListPagination: '/rest/v1/usuario?select=*',
  userAdd: '/rest/v1/usuario',
};

export const USER_TABLE: ITableColumn[] = [
  { key: "displayName", display: "Username" },
  { key: "email", display: "Email" },
  { key: "dni", display: "Dni" },
  {
    key: "created_at",
    display: "Fecha Registro",
    config: {
      isDate: true,
      format: "dd MMM yy"
    }
  },
  {
    key: "estado",
    display: "State",
    config: {
      isBoolean: true,
      values: { true: "Activo", false: "Inactivo" }
    }
  },
  {
    key: "action",
    display: "Action",
    config: {
      isAction: true,
      actions: [
        {title: "detail", styles: "m-2 group relative justify-center rounded-md border border-transparent bg-primary-500 p-1 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-primary-400"},
        {title: "other", styles: "m-2 group relative  justify-center rounded-md border border-transparent bg-blue-500 p-1 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-400"},
      ]
    }
  }
];
