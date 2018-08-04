import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { ProcedureDetailsState, procedureSelector } from './procedure-details.reducer';
import { ActivatedRoute } from '@angular/router';
import { ProcedureDetails, ProcedureDetailsRouteData } from './procedure-details.model';
import { ProcedureFormComponent } from '../components/procedure-form/procedure-form.component';
import { AddRoutine, AddSequence, LoadProcedure, SaveProcedure } from './procedure-details.actions';

@Component({
  selector: 'tm-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit, ComponentCanDeactivate {
  @ViewChild(ProcedureFormComponent) procedureForm: ProcedureFormComponent;

  public procedure$: Observable<ProcedureDetails>;
  public isCopy: boolean;
  public disableSave: boolean;
  public enableDeleteProcedure: boolean;
  public data$: Observable<ProcedureDetailsRouteData>;

  constructor(
    private store: Store<ProcedureDetailsState>,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.procedure$ = this.store.select(procedureSelector);
    this.data$ = this.activatedRoute.data as Observable<ProcedureDetailsRouteData>;
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new LoadProcedure(params.id));
    });
    this.isCopy = false;
    this.disableSave = false;
  }

  onUserGroupChange(value) {
    // this.store.dispatch(new UpdateUserGroup(value));
    // if ( this.isCreate || this.isCopy) {
    //   this.disableSave = false;
    // }
    // this.sessionStorageService.setItem('userGroup', value);
  }

  onUserSiteChange(value) {
  //   this.store.dispatch(new UpdateUserSite(value));
  //   if ( this.isCreate || this.isCopy) {
  //     this.disableSave = false;
  //   }
  //   this.sessionStorageService.setItem('userSite', value);
  }

  onSave() {
    this.store.dispatch(new SaveProcedure());
  }

  canDeactivate(): Observable<boolean> | boolean {
    // return this.procedureForm.form.pristine;
    return true;
  }

  onAddSequence(sequenceId: number) {
    this.disableSave = false;
    this.store.dispatch(new AddSequence(sequenceId));
  }

  onAddRoutine(routineId: number) {
    this.disableSave = false;
    this.store.dispatch(new AddRoutine(routineId));
  }
}
