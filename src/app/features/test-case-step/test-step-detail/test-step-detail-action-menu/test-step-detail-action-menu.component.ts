import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-test-step-detail-action-menu',
  templateUrl: './test-step-detail-action-menu.component.html',
  styleUrls: ['./test-step-detail-action-menu.component.scss']
})
export class TestStepDetailActionMenuComponent {
  @Output() save = new EventEmitter<void>();
  @Output() createCopy = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() isCreate: boolean;
  @Input() testCaseInfo: any;
  @Input() enableDelete: boolean;
  @Input() isCopy: boolean;
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
