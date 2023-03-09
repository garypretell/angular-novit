import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, shareReplay } from 'rxjs';
import { UserEndpoint } from '@shared/utils/endpoints/user.endpoint';
import { ApiService } from './api.service';
import { User } from '@core/interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly apiService: ApiService,
    private http: HttpClient
  ) {}

  /**
   * Obtener usuarios
   */
  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(UserEndpoint.GetUsers, { default: [] }).pipe(shareReplay(1))
  }

  /**
   * Obtener Pagination usuarios
   */
  getUsersPagination(page: any, params: any): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('Range', `${page.from}-${page.to}`);
    header = header.set('Prefer', 'count=exact');
    return this.http.get(UserEndpoint.GetUsersPagination, { params,
      headers: header, observe: 'response' as 'body'}).pipe(shareReplay(1));
  }

  /**
   * Obtener usuario
   */
  getUserbyId(params: any): Observable<User[]> {
    return this.apiService.get<User[]>(UserEndpoint.GetUserbyId, {
      params,
      default: [],
    }).pipe(shareReplay(1));
  }

  /**
   * Registrar Usuario
   */
  addUser(body: User): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Prefer', 'return=minimal');
    return this.apiService.post(UserEndpoint.AddUser, body, { headers });
  }

  /**
   * Actualizar usuario
   */
  updateUser(body: any, params: any): Observable<any> {
    return this.apiService.put(UserEndpoint.UpdateUser, body, {
      params,
      default: [],
    });
  }

  /**
   * Eliminar usuario
   */
  deleteUser(params: any): Observable<any> {
    return this.apiService.delete(UserEndpoint.DeleteUser, {
      params,
      default: [],
    });
  }
}
