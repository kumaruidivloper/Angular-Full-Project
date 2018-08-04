import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginState } from './login.reducer';
import { SecurityState, tokenSelector} from '../../core/services/security/security.reducer';
import { Login } from '../../core/services/security/security.actions';
import { TryUserLogin } from './login.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  public showForm: boolean;
  public token$: Observable<string>;

  constructor(private store: Store<LoginState>,
              private pingStore: Store<SecurityState>) {}

  public onUserLogin(): void {
    this.token$.subscribe(token => {
      if (!token) {
        this.pingStore.dispatch(new Login());
      } else {
        this.store.dispatch(new TryUserLogin());
      }
    });
  }

  ngOnInit() {
    this.token$ = this.pingStore.select(tokenSelector);
  }
}
