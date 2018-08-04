import { CreateProcedureListPipe } from './create-procedure-list.pipe';
import { ProcedureLine, SequenceLine } from '../../procedure-details/procedure-details.model';
import { EntityType } from '../../../../shared/entity-type-badge/entity-type-badge.model';
import { Routine } from '../../../routine/routine-overview/routine-overview.model';
import { SequenceDetails } from '../../../sequence/sequence-details/sequence-details.model';

describe('CreateProcedureListPipe', () => {
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

  const expectedList = [
    {
      lineNo: 1,
      type: EntityType.SEQUENCE,
      name: 'test sequence',
      category: 'DEVELOPMENT',
      level: '1'
    },
    {
      lineNo: 2,
      type: EntityType.ROUTINE,
      name: 'test routine',
      category: 'STANDARD',
      level: '2'
    }
  ];

  let pipe: CreateProcedureListPipe;

  beforeEach(() => {
    pipe = new CreateProcedureListPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform procedure lines tree into a list', () => {
    const list = pipe.transform(procedureLinesTree);

    expect(list).toEqual(expectedList);
  });
});
