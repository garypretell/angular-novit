import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormLogin {
  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
}
