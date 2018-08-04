import { Component, Input, OnInit } from '@angular/core';
import { ProcedureDetails } from '../../procedure-details/procedure-details.model';

@Component({
  selector: 'tm-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.scss']
})
export class ProcedureListComponent implements OnInit {
  @Input() procedure: ProcedureDetails | null;

  constructor() { }

  ngOnInit() {
  }

}
