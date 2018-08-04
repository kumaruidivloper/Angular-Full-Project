import { Component, OnInit } from '@angular/core';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tm-test-progress-details',
  templateUrl: './test-progress-details.component.html',
  styleUrls: ['./test-progress-details.component.scss']
})
export class TestProgressDetailsComponent implements OnInit, ComponentCanDeactivate {
  public progressDetailsForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.progressDetailsForm = new FormGroup({
      firstName: new FormControl()
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.progressDetailsForm.pristine;
  }

}
