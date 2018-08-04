import { Component, OnInit } from '@angular/core';
import { LoginState } from './features/login/login.reducer';
import { Store } from '@ngrx/store';
import { SecurityState } from './core/services/security/security.reducer';
import { TryLogin } from './core/services/security/security.actions';

@Component({
  selector: 'tm-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<LoginState>,
              private pingStore: Store<SecurityState>) {}

  ngOnInit() {
    this.pingStore.dispatch( new TryLogin());
  }
}
