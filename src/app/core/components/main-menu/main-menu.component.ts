import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MainMenuSettings } from './main-menu-settings';
import { IMenuItem } from './main-menu.i';
import { MainMenuActions } from './main-menu.actions';
import { MainMenuState, menuOpenSelector } from './main-menu.reducer';
import {ChangeLanguage} from '../../services/translation/translation.actions';
import {UserLogOut} from '../../../features/login/login.actions';

@Component({
  selector: 'tm-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  public menuItems: IMenuItem[] = MainMenuSettings.menuItems;
  public menuOpen: Observable<boolean>;
  public selectedMenu: any;
  constructor(private store: Store<MainMenuState>) {
  }

  ngOnInit() {
    this.menuOpen = this.store.select(menuOpenSelector);
  }

  toggleMenuOpen(): void {
    this.store.dispatch(new MainMenuActions.Toggle());
  }

  logout(event): void {
    event.preventDefault();
    this.store.dispatch(new UserLogOut());
  }
  onSelect(menu) {this.selectedMenu = menu; }

  changeLanguage(language: string): void {
    this.store.dispatch(new ChangeLanguage(language));
  }
}
