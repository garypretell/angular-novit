import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { equalsLength, onlyNumber } from '@shared/validators/frm-validators';

@Injectable({ providedIn: 'root' })
export class BaseFormUserCreate {
  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    displayName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, onlyNumber(), equalsLength(8)]]
  });
}
