import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ProcedureDetailsState } from '../procedure-details.reducer';
import { Store } from '@ngrx/store';
import { SaveProcedure } from '../procedure-details.actions';

@Component({
  selector: 'tm-procedure-details-action-menu',
  templateUrl: './procedure-details-action-menu.component.html',
  styleUrls: ['./procedure-details-action-menu.component.scss']
})
export class ProcedureDetailsActionMenuComponent {
  @Input() isCopy: boolean;
  @Input() isCreate: boolean;
  @Input() enableDelete: boolean;
  @Input() disableSave: boolean;
  @Output() onSaveButtonClick: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store<ProcedureDetailsState>) {}

  onSave() {
    this.onSaveButtonClick.emit(true);
  }
}
