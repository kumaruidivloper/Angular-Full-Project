import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-test-case-detail-action-menu',
  templateUrl: './test-case-detail-action-menu.component.html',
  styleUrls: ['./test-case-detail-action-menu.component.scss']
})
export class TestCaseDetailActionMenuComponent {
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() createCopy = new EventEmitter<void>();
  @Input() testCaseInfo: any;
  @Input() isCreate: boolean;
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
