// tslint:disable: no-for-in
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map, retry } from 'rxjs/operators';
import { UploadFile } from '@shared/utils/interfaces/upload';
import { NotificationService } from './notication.service';


export class AppError {
  public status = 0;
  constructor(originalError?: any, public message?: any) {}
}

export class NotFoundError extends AppError {}

export class ConflictError extends AppError {}

export class InternalServerError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
    this.status = 500;
  }
}

export class BusinessError extends AppError {
  constructor(public originalError?: any, public override message?: any) {
    super(originalError, message);
    this.status = 900;
  }

  get errors(): any {
    if (this.originalError) {
      return this.originalError;
    }

    return null;
  }
}

export class BadRequestError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
  }

  get errors(): Array<string> | null {
    if (this.originalError) {
      return this.originalError;
    }

    return null;
  }
}

export class OptionsRequest {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | Array<string>;
      };
  observe?: 'body';
  params?: {};
  responseType?: 'json';
  preloader?: boolean;
  reportProgress?: boolean;
  withCredentials?: boolean;
  retry?: number;
  default?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly pipes = [];

  constructor(private readonly httpClient: HttpClient, private readonly notifyService: NotificationService) {}

  get<T>(endPoint: string, options?: OptionsRequest): Observable<T> {
    this.beforeRequest(options!.preloader || false);

    const request: any = this.getUrlAndParameters(endPoint, options!);

    const pipes = this.getPipesDefault(options);
    if (options!.retry !== undefined) {
      pipes.push(retry(options!.retry));
    }
    if (options!.default !== undefined) {
      pipes.push(map(result => result || options!.default));
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.get<T>(request.url, request.options)))
            .pipe(distinctUntilChanged());
  }

  post<T>(endPoint: string, body: any, options: OptionsRequest = {}): Observable<T> {
    this.beforeRequest(options.preloader || false);

    const request: any = this.getUrlAndParameters(endPoint, options);

    const pipes = this.getPipesDefault(options);

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.post<T>(request.url, body, request.options)))
            .pipe(distinctUntilChanged());
  }

  postDownload<T>(endPoint: string, body: any, options: any = {}): Observable<T> {
    this.beforeRequest(options.preloader || false);

    if (options.params) {
      let httpParamsQuery = new HttpParams();
      Object.keys(options.params).forEach((key: string) => {
        if (endPoint.indexOf(`{${key}}`) === -1) {
          httpParamsQuery = httpParamsQuery.append(key, options.params[key]);
        } else {
          // tslint:disable-next-line: no-parameter-reassignment
          endPoint = endPoint.replace(`{${key}}`, options.params[key]);
        }
      });

      options.params = httpParamsQuery;
    }

    const pipes = this.getPipesDefault(options);

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.post<T>(endPoint, body, options)))
            .pipe(distinctUntilChanged());
  }

  put<T>(endPoint: string, body: any, options?: OptionsRequest): any {
    this.beforeRequest(options!.preloader || false);

    const request: any = this.getUrlAndParameters(endPoint, options!);

    const pipes = this.getPipesDefault(options);
    if (options!.retry !== undefined) {
      pipes.push(retry(options!.retry));
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.put<T>(request.url, body, request.options)))
            .pipe(distinctUntilChanged());
  }

  requestFormData<T>(method: string, endPoint: string, body: any, options?: OptionsRequest): Observable<T> {
    return new Observable((observer: any) => {
      const url = this.getUrlAndParametersFormData(endPoint, options!);
      const service = new XMLHttpRequest();
      const formData = new FormData();
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          formData.append(key, body[key]);
        }
      }
      service.onload = () => {
        if (service.status === 200 || service.status === 201) {
          observer.next(JSON.parse(service.response));
        } else {
          observer.error(new Error(service.statusText));
        }
      };
      service.onerror = () => {
        observer.error(new Error(`XMLHttpRequest Error: ${service.statusText}`));
      };
      service.open(method, url);
      service.send(formData);
    });
  }

  putOnlyFormData(url: string, obj: any, options?: any): Observable<any> {
    this.beforeRequest(options.preloader || false);

    // tslint:disable-next-line: comment-type
    /* const headers = new HttpHeaders().set('content-type', 'multipart/form-data'); */

    if (options.params) {
      let httpParamsQuery = new HttpParams();
      Object.keys(options.params).forEach((key: string) => {
        if (url.indexOf(`{${key}}`) === -1) {
          httpParamsQuery = httpParamsQuery.append(key, options.params[key]);
        } else {
          // tslint:disable-next-line: no-parameter-reassignment
          url = url.replace(`{${key}}`, options.params[key]);
        }
      });

      options.params = httpParamsQuery;
    }

    const pipes = this.getPipesDefault(options);
    if (options.retry) {
      pipes.push(retry(options.retry));
    }

    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.put(url, formData, options)))
            .pipe(distinctUntilChanged());
  }

  postOnlyFormData(url: string, obj: any, options?: any): Observable<any> {
    this.beforeRequest(options.preloader || false);

    if (options.params) {
      let httpParamsQuery = new HttpParams();
      Object.keys(options.params).forEach((key: string) => {
        if (url.indexOf(`{${key}}`) === -1) {
          httpParamsQuery = httpParamsQuery.append(key, options.params[key]);
        } else {
          // tslint:disable-next-line: no-parameter-reassignment
          url = url.replace(`{${key}}`, options.params[key]);
        }
      });

      options.params = httpParamsQuery;
    }

    const pipes = this.getPipesDefault(options);
    if (options.retry) {
      pipes.push(retry(options.retry));
    }

    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.post(url, formData, options)))
            .pipe(distinctUntilChanged());
  }

  putDataAndFile(url: string, body: any, files: Array<UploadFile>, options?: any): Observable<any> {
    this.beforeRequest(options.preloader || false);

    if (options.params) {
      let httpParamsQuery = new HttpParams();
      Object.keys(options.params).forEach((key: string) => {
        if (url.indexOf(`{${key}}`) === -1) {
          httpParamsQuery = httpParamsQuery.append(key, options.params[key]);
        } else {
          // tslint:disable-next-line: no-parameter-reassignment
          url = url.replace(`{${key}}`, options.params[key]);
        }
      });

      options.params = httpParamsQuery;
    }

    const pipes = this.getPipesDefault(options);
    if (options.retry) {
      pipes.push(retry(options.retry));
    }

    const formData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (!isEmpty(files)) {
      files.forEach((item: any) => {
        formData.append(item.name, item.nativeFile, encodeURIComponent(item.nativeFile.name));
      });
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.put(url, formData, options)))
            .pipe(distinctUntilChanged());

  }

  postDataAndFile(
    endPoint: string,
    body: any,
    files: Array<{ name: string; native: File }>,
    options: OptionsRequest
  ): Observable<any> {
    this.beforeRequest(options.preloader || false);

    const request: any = this.getUrlAndParameters(endPoint, options);

    const pipes = this.getPipesDefault(options);

    if (options.retry) {
      pipes.push(retry(options.retry));
    }

    const formData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (!isEmpty(files)) {
      files.forEach(file => {
        formData.append(file.name, file.native, encodeURIComponent(file.native.name));
      });
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.post(request.url, formData, request.options)))
            .pipe(distinctUntilChanged());
  }

  del<T>(endPoint: string, options?: OptionsRequest): any {
    this.beforeRequest(options!.preloader || false);

    const request: any = this.getUrlAndParameters(endPoint, options!);

    const pipes = this.getPipesDefault(options);
    if (options!.retry !== undefined) {
      pipes.push(retry(options!.retry));
    }

    return pipes
            .reduce((obs, op) => obs.pipe(op), (this.httpClient.delete<T>(request.url, request.options)))
            .pipe(distinctUntilChanged());
  }

  delete(endPoint: string, options?: OptionsRequest): any {
    return this.del(endPoint, options);
  }

  private getPipesDefault(options?: any): Array<any> {
    const pipes = [];

    pipes.push(catchError((err: any) => this.onCatch(err)));
    pipes.push(
      finalize(() => {
        this.onFinally(options.preloader);
      })
    );

    return pipes;
  }

  /**
   * Control de Error
   */
  private onCatch(error: any): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // tslint:disable-next-line: no-shadowed-variable
      const messageError = `An error occurred: ${error.error.message}`;
      this.notifyService.addError(`Error: ${messageError}`);

      return throwError(error);
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const messageError: string =
      `` + `Backend returned code ${error.status},` + `body was: ${error.error}` + `\nMessage: ${error.message}`;
    this.notifyService.addErrorWithData(`Error: ${messageError}`, error);

    return this.handleError(error);
  }

  /**
   * Antes de una solicitud
   */
  private beforeRequest(preloader: boolean): void {
    if (preloader) {
      this.notifyService.showPreloader();
    }
  }

  /**
   * Despues de una solicitud
   */
  private afterRequest(preloader: boolean): void {
    if (preloader) {
      this.notifyService.hidePreloader();
    }
  }

  /**
   * Finalización de una solicitud
   */
  private onFinally(preloader: boolean = false): void {
    // this.notifyService.consoleLog('onFinally-Log');
    this.afterRequest(preloader);
  }

  private handleError(error: HttpErrorResponse): any {
    switch (error.status) {
      case 400:
        return throwError(() => new BadRequestError(error));
      case 404:
        return throwError(() => new NotFoundError());
      case 409:
        return throwError(() => new ConflictError());
      case 500:
        return throwError(() => new InternalServerError(error));
      case 900:
        return throwError(() => new BusinessError(error, error.error.mensaje));
      default:
        return throwError(() => new AppError(error));
    }
  }

  private isParameterInPath(endPoint: string, parameterKey: string): boolean {
    return !(endPoint.indexOf(`{${parameterKey}}`) === -1);
  }

  private getUrlAndParameters(url: string, optionsRequest: any): { url?: string; options?: OptionsRequest } {
    const options: OptionsRequest = new OptionsRequest();
    let paramsQuery = new HttpParams();

    if (optionsRequest.params) {
      Object.keys(optionsRequest.params).forEach((parameterKey: string) => {
        if (this.isParameterInPath(url, parameterKey)) {
          // tslint:disable-next-line: no-parameter-reassignment
          url = url.replace(`{${parameterKey}}`, optionsRequest.params[parameterKey]);
        } else {
          paramsQuery = paramsQuery.append(parameterKey, optionsRequest.params[parameterKey]);
        }
      });
    }

    options.params = paramsQuery;
    options.headers = optionsRequest.headers;

    return {
      url,
      options
    };
  }

  private getUrlAndParametersFormData(url: string, optionsRequest: any): string {
    const query: any[] = [];
    if (optionsRequest.params) {
      Object.keys(optionsRequest.params).forEach((parameterKey: string) => {
        if (this.isParameterInPath(url, parameterKey)) {
          // tslint:disable-next-line: no-parameter-reassignment
          url = url.replace(`{${parameterKey}}`, optionsRequest.params[parameterKey]);
        } else {
          query.push(`${parameterKey}=${optionsRequest.params[parameterKey]}`);
        }
      });
    }
    if (query.length) {
      // tslint:disable-next-line: no-parameter-reassignment
      url = `${url}?${query.join('&')}`;
    }

    return url;
  }
  // tslint:disable-next-line: max-file-line-count
}
