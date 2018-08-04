import { Component, OnInit } from '@angular/core';
import { homeLinks } from './home.links';
import { HomeLink } from './home.model';
import { SecurityState } from '../../core/services/security/security.reducer';
import { Store } from '@ngrx/store';
import { LoginState } from '../login/login.reducer';
import { TryUserLogin } from '../login/login.actions';

@Component({
  selector: 'tm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor ( private pingStore: Store<SecurityState>,
                private store: Store<LoginState>) {}
  public homeLinks: HomeLink[] = homeLinks;

  ngOnInit() {
    this.store.dispatch( new TryUserLogin());
  }
}

