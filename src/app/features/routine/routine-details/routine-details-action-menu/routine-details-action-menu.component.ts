import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-routine-details-action-menu',
  templateUrl: './routine-details-action-menu.component.html',
  styleUrls: ['./routine-details-action-menu.component.scss']
})
export class RoutineDetailsActionMenuComponent {
  @Input() isCopy: boolean;
  @Input() isCreate: boolean;
  @Input() routineInfo: any;
  @Input() enableDelete: boolean;
  @Input() disableCreateCopy: boolean;
  @Input() disableSave: boolean;

  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() createProtocol = new EventEmitter<void>();
  @Output() createCopy = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onCreateProtocol() {
    this.createProtocol.emit();
  }
  onCreateCopy() {
    this.createCopy.emit();
  }
}
