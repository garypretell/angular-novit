export const PATH_SERVICE: any = {
  login: '/auth/v1/token?grant_type=password',
  user: '/rest/v1/usuario?uid=eq.',
  userId: '/rest/v1/usuario?id=eq.',
  userList: '/rest/v1/usuario',
  userListPagination: '/rest/v1/usuario?select=*',
  userAdd: '/rest/v1/usuario',
};
