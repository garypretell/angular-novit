import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IModal {
  title: string;
  message: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalSubject: BehaviorSubject<IModal> = new BehaviorSubject<IModal>({ title: '', message: '', show: false });

  get modalValue(): IModal {
    return this.modalSubject.value;
  }

  get modalObs() {
    return this.modalSubject.asObservable();
  }

  set modalData(data: IModal) {
    this.modalSubject.next(data);
  }
}

