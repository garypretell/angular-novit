import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlErrorMessagePipe } from '@shared/pipes/ctrl-error-msg/control-error-message.pipe';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  standalone: true,
  imports: [CommonModule, ControlErrorMessagePipe]
})
export class MessageErrorComponent {
  @Input() control!: any;
}
