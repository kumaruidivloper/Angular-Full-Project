import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { isEqual, sortBy, uniqWith } from 'lodash';
import { DeleteSequenceItem, DeleteSequenceLine, ReorderSequenceLine } from '../sequence-details.actions';
import { SequenceDetailsState } from '../sequence-details.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tm-add-sequence-preconditions',
  templateUrl: './add-sequence-preconditions.component.html',
  styleUrls: ['./add-sequence-preconditions.component.scss']
})
export class AddSequencePreconditionsComponent implements DoCheck {
  @Input() disableBtn: boolean;
  @Input() asyncData: any ;
  @Input() isCreate: boolean ;
  @Output() preConditionsAdded: EventEmitter<boolean> = new EventEmitter();

  public selectedData = [];
  public expandRow: any = [];

  constructor(private store: Store<SequenceDetailsState>) {}

  ngDoCheck() {
    if (this.asyncData && this.asyncData.length > 0) {
      for (const val of  this.asyncData) {
        if (val.sequenceLineType === 'SEQUENCE_GROUP') {
          val.sequenceGroupID.sequenceGroupLines = uniqWith(val.sequenceGroupID.sequenceGroupLines, isEqual);
        }
      }
    }
    this.selectedData = sortBy(this.asyncData, ['lineNo']);
  }

  toggleTableRow(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onMoveUpClick(index) {
    this.store.dispatch(new ReorderSequenceLine(index, index - 1));
    this.preConditionsAdded.emit(true);
  }

  onMoveDownClick(index) {
    this.store.dispatch(new ReorderSequenceLine(index, index + 1));
    this.preConditionsAdded.emit(true);
  }

  onDeleteClick(index, lineId) {
    if (lineId === 0) {
      this.store.dispatch(new DeleteSequenceItem(index));
    } else {
      this.store.dispatch(new DeleteSequenceLine(lineId, index));
      this.preConditionsAdded.emit(true);
    }
  }

  onDataAdd(event) {
    if (event) {
      this.preConditionsAdded.emit(true);
    }
  }
}
