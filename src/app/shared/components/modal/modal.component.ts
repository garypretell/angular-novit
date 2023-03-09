import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@core/services/modal.service';
import { MODAL_ALERT } from '@core/constants/modal-title';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent   {

  constructor(public modalService: ModalService) { }

  showModal() {
    MODAL_ALERT.show = true;
    this.modalService.modalData = MODAL_ALERT;
  }

  hideModal() {
    MODAL_ALERT.show = false;
    this.modalService.modalData = MODAL_ALERT;
  }

}
