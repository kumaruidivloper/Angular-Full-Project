import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User, UserGroup, UserState } from '../../../services/user/user.model';
import { groupsSelector, userSelector } from '../../../services/user/user.reducer';
import {GetUserGroups} from '../../../services/user/user.actions';

@Component({
  selector: 'tm-user-group',
  templateUrl: './user-group.component.html'
})
export class UserGroupComponent implements OnInit {
  @Input() hasAllOption: boolean = true;
  @Input() selectedGroup: string;
  @Output() userGroupChange: EventEmitter<string> = new EventEmitter();

  public user$: Observable<User>;
  public userGroups$: Observable<UserGroup[]>;
  public defaultGroup: string;
  constructor(private store: Store<UserState>) { }

  ngOnInit() {
    this.userGroups$ = this.store.select(groupsSelector);
    this.userGroups$.subscribe( res => {
      if (res && res.length > 0) {
        this.defaultGroup =   this.selectedGroup ? this.selectedGroup : res[0].groupName;
        this.userGroupChange.emit(this.defaultGroup);
      } else {
        this.store.dispatch( new GetUserGroups());
      }
    });
    this.user$ = this.store.select(userSelector);
  }

  public onChangeGroup(value: string) {
    this.userGroupChange.emit(value);
  }

}
