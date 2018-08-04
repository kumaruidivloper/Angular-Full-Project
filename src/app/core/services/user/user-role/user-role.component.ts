import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserRole, UserState } from '../user.model';
import { roleSelector } from '../user.reducer';
import { GetUserRole } from '../user.actions';

@Component({
  selector: 'tm-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  public userRole$: Observable<UserRole[]>;
  constructor(private store: Store<UserState>) { }

  ngOnInit() {
    this.userRole$ = this.store.select(roleSelector);
      this.store.dispatch(new GetUserRole());
    this.userRole$.subscribe(() => {});
  }

}
