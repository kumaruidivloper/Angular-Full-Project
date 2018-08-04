import { Component, Input, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ProcedureDetails } from '../../procedure-details/procedure-details.model';

@Component({
  selector: 'tm-procedure-tree',
  templateUrl: './procedure-tree.component.html',
  styleUrls: ['./procedure-tree.component.scss']
})
export class ProcedureTreeComponent {
  @Input() procedure: ProcedureDetails | null;

  public config: TreeviewConfig;

  constructor() {
    this.config = {
      hasAllCheckBox: false,
      hasFilter: false,
      hasCollapseExpand: false,
      decoupleChildFromParent: true,
      maxHeight: 500,
      hasDivider: false
    };
  }
}
