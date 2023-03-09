import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MODAL_ALERT } from '@core/constants/modal-title';
import {
  AuthSession,
  AuthUser,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import {
  BehaviorSubject,
  first,
  lastValueFrom,
  Observable,
  of,
  shareReplay,
  take,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { PATH_SERVICE } from '../constants/constants';
import { LOGIN_ALERT } from '../constants/modal-titles';

import { User } from '../interfaces/user';
import { DataService } from './data.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  user$!: Observable<any>;

  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  _user: AuthUser | null = null;
  constructor(
    private router: Router,
    public jwtHelper: JwtHelperService,
    private dataService: DataService,
    private modalService: ModalService
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.init();
  }

  init() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user$ = of(JSON.parse(user));
      this._currentUser.next(user);
      this.checkToken();
    } else {
      this.signOut();
    }
  }

  get user() {
    this.supabase.auth.getUser().then(({ data }) => {
      this._user = data.user;
    });
    return this._user;
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      MODAL_ALERT.title = 'Alerta';
      MODAL_ALERT.message =
        'La sesión ha expirado!';
      MODAL_ALERT.show = true;
      this.modalService.modalData = MODAL_ALERT;
      this.signOut();
    }
  }

  async usuario(uid: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('usuario')
      .select('*')
      .match({ uid })
      .single();
    return data;
  }

  getUser$(): any {
    return this.user$?.pipe(take(1)).toPromise();
  }

  async getValue(): Promise<any> {
    const temp = await lastValueFrom(this.user$);
    console.log(temp);
    return temp;
  }

  isEmailVerified(user: any): boolean {
    return user.confirmed_at ? true : false;
  }

  get currentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }

  getUser(): any {
    return this.currentUser.pipe(first()).toPromise();
  }

  async signUp(usuario: any): Promise<any> {
    const credentials = { email: usuario.email, password: usuario.password };
    return new Promise(async (resolve, reject) => {
      const { data, error } = await this.supabase.auth.signUp(credentials);
      if (error) {
        reject(error);
      } else {
        this.createUserData(data.user, usuario);
        resolve(data.user);
      }
    });
  }

  signIn(credentials: { email: any; password: any }): any {
    const pathService = environment.supabaseUrl + PATH_SERVICE.login;
    this.dataService.set(pathService);
    return this.dataService.execPostJsonAndStatus(credentials);
  }

  myUser(uid: string): Observable<any> {
    const pathService = environment.supabaseUrl + PATH_SERVICE.user + uid;
    this.dataService.set(pathService);
    return this.dataService.execGetJsonAndStatus();
  }

  userById(id: string): Observable<any> {
    const pathService = environment.supabaseUrl + PATH_SERVICE.userId + id;
    this.dataService.set(pathService);
    return this.dataService.execGet(shareReplay(1));
  }

  userList(): Observable<User[]> {
    const pathService = environment.supabaseUrl + PATH_SERVICE.userList;
    this.dataService.set(pathService);
    return this.dataService.execGet().pipe(shareReplay(1));
  }

  async signOut(): Promise<any> {
    localStorage.clear();
    this.user$ = of(null);
    this._currentUser.next(false);
    await this.supabase.auth.signOut().then((_) => {
      this.router.navigateByUrl('/');
    });
  }

  private async createUserData(user: any, usuario: User) {
    const usuarioCreate: User = {
      lastSesion: Date.now(),
      uid: user.id,
      displayName: usuario.displayName,
      email: user.email,
      dni: usuario.dni,
      estado: true,
      avatar:
        'https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-businessman-avatar-cartoon-style-png-image_1953664.jpg',
      roles: {
        subscriber: true,
        editor: true,
        admin: false,
        super: false,
      },
    };

    const { data, error } = await this.supabase
      .from('usuario')
      .insert([usuarioCreate]);
    return { data, error };
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber', 'super'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor', 'super'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin', 'super'];
    return this.checkAuthorization(user, allowed);
  }

  canSuper(user: User): boolean {
    const allowed = ['super'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: any[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
