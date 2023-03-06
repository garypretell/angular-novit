import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlErrorMessagePipe } from './control-error-message.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ControlErrorMessagePipe
  ],
  exports: [
    ControlErrorMessagePipe,
  ],
  providers: [

  ]
})
export class ControlErrorMessageModule {
}
