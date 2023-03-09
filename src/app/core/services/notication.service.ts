import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TYPES_NOTIFY } from '@shared/utils/enums/types-notify';

import { AlertNotify, ErrorNotify, MessageNotify, Notify, WarningNotify } from '@shared/utils/enums//notify';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifies!: Array<Notify>;
  notifiesBehaviorSubject!: BehaviorSubject<Array<Notify>>;
  spinnerBehavior!: BehaviorSubject<boolean>;
  constructor() {
    this.init();
  }

  /**
   * Inicializador del servicios de Notificaciones
   */
  init(): void {
    this.notifies = new Array<AlertNotify>();
    this.notifiesBehaviorSubject = new BehaviorSubject<Array<AlertNotify>>(this.notifies);
    this.spinnerBehavior = new BehaviorSubject<boolean>(false);
  }

  /**
   * Agregar una notificación de Alerta
   * @param message Descripción de notificación de Alerta
   */
  addAlert(message: string): void {
    this.add(new AlertNotify(message));
  }

  /**
   * Agreagr una notificación tipo Mensaje
   * @param message Descripción de notificación tipo Mensaje
   */
  addMessage(message: string): void {
    this.add(new MessageNotify(message));
  }

  /**
   * Agregar una notificación tipo Advertencia
   * @param message Descripción de notificación tipo Advertencia
   */
  addWarning(message: string): void {
    this.add(new WarningNotify(message));
  }

  /**
   * Agregar una notificación de tipo Error
   * @param message Descripción de notificación tipo Error
   */
  addError(message: string): void {
    this.add(new ErrorNotify(message));
  }

  /**
   * Agregar una notificación de tipo Error
   * @param message Descripción de notificación tipo Error
   */
  addErrorWithData(message: string, data: Object): void {
    this.add(new ErrorNotify(message, data));
  }

  getNotifies(): BehaviorSubject<Array<Notify>> {
    return this.notifiesBehaviorSubject;
  }

  /**
   * Retorna todas las notificaciones tipo Alerta
   */
  getAlerts(): Array<AlertNotify> {
    return this.notifies.filter((n: Notify) => n.type === TYPES_NOTIFY.ALERT);
  }

  /**
   * Retorna la última notificación de Alerta
   */
  getLastAlert(): ErrorNotify {
    const errors = this.getAlerts();

    return errors[errors.length - 1];
  }

  /**
   * Retorna todas las notificaciones tipo Mensaje
   */
  getMessages(): Array<MessageNotify> {
    return this.notifies.filter((n: Notify) => n.type === TYPES_NOTIFY.MESSAGE);
  }

  /**
   * Retorna todas las notificaciones tipo Advertencia
   */
  getWarnings(): Array<WarningNotify> {
    return this.notifies.filter((n: Notify) => n.type === TYPES_NOTIFY.WARNING);
  }

  /**
   * Retorna todas las notificaciones tipo Error
   */
  getErrors(): Array<ErrorNotify> {
    return this.notifies.filter((n: Notify) => n.type === TYPES_NOTIFY.ERROR);
  }

  /**
   * Retorna la última notificación de Error
   */
  getLastError(): ErrorNotify {
    const errors = this.getErrors();

    return errors[errors.length - 1];
  }

  /**
   * Agrega un mensaje de advertencia por no tener permiso para realizar alguna acción
   */
  notPermission(): void {
    this.addWarning('You do not have permission to perform this action');
  }

  getSpinner(): BehaviorSubject<boolean> {
    return this.spinnerBehavior;
  }

  showPreloader(): void {
    this.spinnerBehavior.next(true);
  }

  hidePreloader(): void {
    this.spinnerBehavior.next(false);
  }

  consoleLog(message: string): void {
    return;
  }

  private add(notify: Notify): void {
    this.notifies = [...this.notifies, notify];
    this.getNotifies().next(this.notifies);
  }
}
