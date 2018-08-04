import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-variant-action-menu',
  templateUrl: './variant-action-menu.component.html',
  styleUrls: ['./variant-action-menu.component.scss']
})
export class VariantActionMenuComponent {
  @Output() save = new EventEmitter<void>();
  @Output() cancelVariant = new EventEmitter<void>();
  @Input() testCaseInfo: any;
  @Input() isCreate: boolean;
  @Input() enableDelete: boolean;

  onSave() {
    this.save.emit();
  }
  onCancelVariant() {
    this.cancelVariant.emit();
  }

}
