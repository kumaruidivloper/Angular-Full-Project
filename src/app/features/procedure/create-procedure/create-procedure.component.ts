import {Component, OnInit, ViewChild} from '@angular/core';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import {AddRoutine, AddSequence, SaveProcedure} from '../procedure-details/procedure-details.actions';
import {ProcedureDetailsState, procedureSelector} from '../procedure-details/procedure-details.reducer';
import {ProcedureDetails} from '../procedure-details/procedure-details.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from '../../../core/storage/session-storage.service';
import {FormGroup} from '@angular/forms';
import {ProcedureFormComponent} from '../components/procedure-form/procedure-form.component';

@Component({
  selector: 'tm-create-procedure',
  templateUrl: './create-procedure.component.html',
  styleUrls: ['./create-procedure.component.scss']
})
export class CreateProcedureComponent implements OnInit, ComponentCanDeactivate {
  public procedure$: Observable<ProcedureDetails>;
  @ViewChild(ProcedureFormComponent) procedureForm: ProcedureFormComponent;
  constructor(
    private store: Store<ProcedureDetailsState>,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.procedure$ = this.store.select(procedureSelector);
  }

  canDeactivate() {
    return true;
  }

  onAddSequence(sequenceId: number) {
    // this.disableSave = false;
    // this.store.dispatch(new AddSequence(sequenceId));
  }

  onAddRoutine(routineId: number) {
    // this.disableSave = false;
    // this.store.dispatch(new AddRoutine(routineId));
  }

  onSave() {
    // console.log(this.procedureForm.procedureForm.valid);
    if (this.procedureForm.procedureForm.valid) {
      this.store.dispatch(new SaveProcedure());
    } else {
      Object.keys(this.procedureForm.procedureForm.controls).forEach(field => {
        const control = this.procedureForm.procedureForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
