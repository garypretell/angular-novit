import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface PuedeDesactivar {
  permitirSalida: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateGuard: CanDeactivateFn<PuedeDesactivar> = (component, currentRoute, currentState, nextState) => {
  return component.permitirSalida ? component.permitirSalida() : true;
};
