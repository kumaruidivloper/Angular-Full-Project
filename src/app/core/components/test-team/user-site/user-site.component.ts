import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User, UserSite, UserState} from '../../../services/user/user.model';
import {sitesSelector, userSelector} from '../../../services/user/user.reducer';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { GetUserSites} from '../../../services/user/user.actions';

@Component({
  selector: 'tm-user-site',
  templateUrl: './user-site.component.html'
})
export class UserSiteComponent implements OnInit {
  @Input() hasAllOption: boolean = true;
  @Input() selectedSite: string;
  @Output() userSiteChange: EventEmitter<string> = new EventEmitter();

  public user$: Observable<User>;
  public userSites$: Observable<UserSite[]>;
  public defaultSite: string;
  constructor(private store: Store<UserState>) { }

  ngOnInit() {
    this.userSites$ = this.store.select(sitesSelector);
    this.userSites$.subscribe(res => {
      if (res && res.length > 0) {
        this.defaultSite =  this.selectedSite ? this.selectedSite : res[0].siteName;
        this.userSiteChange.emit(this.defaultSite);
      } else {
        this.store.dispatch(new GetUserSites());
      }
    });
    this.user$ = this.store.select(userSelector);
  }

  public onChangeSite(value: string) {
    this.userSiteChange.emit(value);
  }

}
