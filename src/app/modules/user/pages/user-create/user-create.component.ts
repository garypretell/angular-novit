import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from '@core/services/user.service';
import { BaseFormUserCreate } from '@core/utils/base-form-user-create';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  userService = inject(UserService);
  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>, public formUserCreate: BaseFormUserCreate,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.formUserCreate.baseForm.reset();
    }

  createUser() {
    const user = {
      "lastSesion": "1673543552953",
      "uid": "04995b1c-d804-466f-8cb9-424455660777",
      "displayName": this.formUserCreate.baseForm.get('displayName')?.value,
      "email": this.formUserCreate.baseForm.get('email')?.value,
      "dni": this.formUserCreate.baseForm.get('dni')?.value,
      "estado": true,
      "avatar":
        "https://png.pngtree.com/png-vector/20191104/ourmid/pngtree-businessman-avatar-cartoon-style-png-image_1953664.jpg",
      "roles": {
        "subscriber": true,
        "editor": true,
        "admin": false,
        "super": false
      }
    }
    this.data.user = user;

  }
}
