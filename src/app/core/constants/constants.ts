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
      actions: ["detail"]
    }
  }
];
