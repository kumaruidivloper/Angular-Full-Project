import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { ProcedureCategory, ProcedureDetails } from '../../procedure-details/procedure-details.model';
import { ProcedureView } from '../procedure-tree/procedure-tree.model';
import { Sequence } from '../../../sequence/sequence-overview/sequence-overview.model';
import { Routine } from '../../../routine/routine-overview/routine-overview.model';

@Component({
  selector: 'tm-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.scss']
})
export class ProcedureFormComponent implements OnChanges {
  @Input() procedure: ProcedureDetails | null;

  @Output() addSequence: EventEmitter<number> = new EventEmitter<number>();
  @Output() addRoutine: EventEmitter<number> = new EventEmitter<number>();

  public procedureForm: FormGroup;
  public procedureCategories = ProcedureCategory;
  public view: ProcedureView;
  public Views = ProcedureView;

  constructor (private formBuilder: FormBuilder) {
    this.procedureForm = formBuilder.group({
      basedOn: '',
      name: ['', Validators.required],
      category: ProcedureCategory.STANDARD,
      private: true,
      description: '',
      changeInfo: '',
      id: 0,
      lines: [[]],
      loadWeight: '',
      procedureSite: '',
      procedureUserGroup: '',
      testOverView: null,
      type: ProcedureCategory.STANDARD
    });
    this.view = ProcedureView.Tree;
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.procedure && changes.procedure.currentValue) {
      this.procedureForm.patchValue(changes.procedure.currentValue);
    }
  }

  onAddSequence(sequence: Sequence) {
    this.addSequence.emit(sequence.id);
  }

  onAddRoutine(routine: Routine) {
    this.addRoutine.emit(routine.id);
  }

  getField(field: string) {
    return this.procedureForm.get(field);
  }
  get name() { return this.getField('name'); }
}
