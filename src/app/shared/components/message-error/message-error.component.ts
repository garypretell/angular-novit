import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlErrorMessageModule } from '@shared/pipes/ctrl-error-msg/control-error-message.module';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  standalone: true,
  imports: [CommonModule, ControlErrorMessageModule]
})
export class MessageErrorComponent {
  @Input() control!: any;
}
