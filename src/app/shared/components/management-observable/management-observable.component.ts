import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-observable.component.html',
  styleUrls: ['./management-observable.component.scss']
})
export class ManagementObservableComponent {
  @Input() obs!: any | null;
  @Input() err!: any | null;
  @Input() obsTemplate! : TemplateRef<any>;
  @Input() obsErrTemplate! : TemplateRef<any>;
}
