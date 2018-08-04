import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-sequence-details-action-menu',
  templateUrl: './sequence-details-action-menu.component.html',
  styleUrls: ['./sequence-details-action-menu.component.scss']
})
export class SequenceDetailsActionMenuComponent {
  @Input() disableUpdateSequence: boolean;
  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() createCopy = new EventEmitter<void>();

  @Input() isCopy: boolean;
  @Input() isCreate: boolean;
  @Input() sequenceInfo: any;
  @Input() disableSave: boolean;

  onSave() {
    this.save.emit();
  }
  onDelete() {
    this.delete.emit();
  }

  onCreateCopy() {
    this.createCopy.emit();
  }
}
