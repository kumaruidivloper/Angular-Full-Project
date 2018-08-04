import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-test-details-action-menu',
  templateUrl: './test-details-action-menu.component.html',
  styleUrls: ['./test-details-action-menu.component.scss']
})
export class TestDetailsActionMenuComponent {
  @Input() isCreate: boolean;
  @Input() testInfo: any;
  @Input() enableDelete: boolean;
  @Input() disableSave: boolean;

  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() createProtocol = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onCreateProtocol() {
    this.createProtocol.emit();
  }

}
