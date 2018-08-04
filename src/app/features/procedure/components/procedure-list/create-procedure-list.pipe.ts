import { Pipe, PipeTransform } from '@angular/core';
import { ProcedureLine, SequenceLine } from '../../procedure-details/procedure-details.model';
import { cloneDeep, flattenDeep } from 'lodash';
import { EntityType } from '../../../../shared/entity-type-badge/entity-type-badge.model';

@Pipe({
  name: 'createProcedureList'
})
export class CreateProcedureListPipe implements PipeTransform {

  transform(procedureLines: ProcedureLine[]): any[] {
    return flattenDeep(procedureLines.map(line => {
      if ( line.procedureLineType === EntityType.SEQUENCE
            && line.sequence.sequenceLines
            && line.sequence.sequenceLines.length ) {
        const currentLine = cloneDeep(line);
        currentLine.sequence.sequenceLines = undefined;
        return [this.createLine(line), ...this.transform(line.sequence.sequenceLines)];
      }
      return this.createLine(line);
    }));
  }

  private createLine(line: ProcedureLine | SequenceLine) {
    const { lineNo } = line;
    const type = (<ProcedureLine>line).procedureLineType || (<SequenceLine>line).sequenceLineType;
    const lineEntity = line.testCase || line.routine || line.sequence;
    // const { name, category, level } = lineEntity;
    const { name, level } = lineEntity;

    // return {
      // lineNo,
      // type,
      // name,
      // category,
      // level
    // };
    return {
        lineNo,
        type,
        name,
        level
      };
    }
}
