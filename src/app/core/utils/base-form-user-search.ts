import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUserSearch {
  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    displayName: [''],
    email: [''],
    dni: [''],
  });
}
