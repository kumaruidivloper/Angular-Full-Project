import { CreateProcedureTreeViewPipe } from './create-procedure-treeview.pipe';
import { ProcedureLine, SequenceLine } from '../../procedure-details/procedure-details.model';
import { SequenceDetails } from '../../../sequence/sequence-details/sequence-details.model';
import { Routine } from '../../../routine/routine-overview/routine-overview.model';
import { EntityType } from '../../../../shared/entity-type-badge/entity-type-badge.model';
import { TreeviewItem } from 'ngx-treeview';

describe('CreateProcedureTreeViewPipe', () => {
  const procedureLinesTree: ProcedureLine[] = [
    {
      procedureLineType: EntityType.SEQUENCE,
      lineNo: 1,
      sequence: {
        name: 'test sequence',
        category: 'DEVELOPMENT',
        level: '1',
        sequenceLines: [
          {
            sequenceLineType: EntityType.ROUTINE,
            lineNo: 2,
            routine: {
              name: 'test routine',
              category: 'STANDARD',
              level: '2'
            } as Routine
          } as SequenceLine
        ] as SequenceLine[]
      } as SequenceDetails
    }
  ];

  const expectedTreeviewItem: TreeviewItem[] = [
    new TreeviewItem({
      text: 'test sequence',
      value: {
        category: 'DEVELOPMENT',
        level: '1',
        type: EntityType.SEQUENCE,
        lineNo: 1
      },
      checked: false,
      children: [
        new TreeviewItem({
          text: 'test routine',
          value: {
            category: 'STANDARD',
            level: '2',
            type: EntityType.ROUTINE,
            lineNo: 2
          },
          checked: false,
          children: []
        })
      ]
    })
  ];

  let pipe: CreateProcedureTreeViewPipe;

  beforeEach(() => {
    pipe = new CreateProcedureTreeViewPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no value provided', () => {
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should transform procedure lines into TreeviewItem', () => {
    const treeviewItem: TreeviewItem[] = pipe.transform(procedureLinesTree);

    expect(treeviewItem).toEqual(expectedTreeviewItem);
  });
});
