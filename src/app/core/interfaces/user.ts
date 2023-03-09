export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
  super?: boolean;
}

export interface User {
  id?: any;
  lastSesion: any;
  uid: string;
  displayName: string;
  dni: number;
  avatar: string;
  email: string;
  estado: boolean;
  roles: any;
}
