import { Pipe, PipeTransform } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { ProcedureLine } from '../../procedure-details/procedure-details.model';
import { EntityType } from '../../../../shared/entity-type-badge/entity-type-badge.model';

@Pipe({
  name: 'createProcedureTreeView'
})
export class CreateProcedureTreeViewPipe implements PipeTransform {

  transform(value: ProcedureLine[]): TreeviewItem[] {
    if (!value) {
      return [];
    }
    return value.map(line => {
      return this.createTreeViewItem(line);

    });
  }

  private createTreeViewItem (line) {
    const lineItem = this.getLineItem(line);
    const type = line.procedureLineType || line.sequenceLineType;
    const children = (type === EntityType.SEQUENCE && line.sequence.sequenceLines)
      ? line.sequence.sequenceLines.map(sequenceLine => this.createTreeViewItem(sequenceLine))
      : undefined;

    const { category, level } = lineItem;

    return new TreeviewItem({
      text: lineItem.name,
      value: {
        category,
        level,
        type,
        lineNo: line.lineNo
      },
      checked: false,
      children: children || []
    });
  }

  private getLineItem(line) {
    return line.testCase || line.routine || line.sequence;
  }

}
