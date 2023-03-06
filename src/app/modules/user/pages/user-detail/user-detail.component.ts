import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH_URL_DATA } from '@core/constants/routes';
import { User } from '@core/interfaces/user';
import { TabManagerService } from '@modules/tab-bar';
import { endWith, map, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit{
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  tabManager = inject(TabManagerService);
  id = this.route.snapshot.paramMap.get('id');
  user = this.route.snapshot.data['userData'];

  userCopy!: User;
  form!: FormGroup;
  private destroyNotifier$ = new Subject<void>();
  

  ngOnInit(): void {
    if (!this.user || this.user.length === 0) {
      this.router.navigate([`${PATH_URL_DATA.urlUserList}`]);
    }
    this.userCopy = { ...this.user };
    this.initForm(this.userCopy);
    this.addOrUpdateSelfTab();
  }

  private initForm(initialValue: User): void {
    this.form = this.fb.group({
      displayname: [initialValue.displayName],
      email: [initialValue.email]
    });
  }

  private addOrUpdateSelfTab(): void {
    this.tabManager.addOrUpdate({
      url: this.router.url,
      title: `${this.userCopy.displayName} (${this.userCopy.id})`,
      dirty$:this.form.valueChanges.pipe(
        takeUntil(this.destroyNotifier$),
        map((_) => this.form.dirty),
        endWith(false)
      ),
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
