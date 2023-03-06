import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@core/services/modal.service';


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
    this.modalService.modalData.show = true;
  }

  hideModal() {
    this.modalService.modalData.show = false;
  }

}
