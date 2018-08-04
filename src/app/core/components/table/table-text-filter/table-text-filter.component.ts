import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Filter } from '../../../interfaces/filter.model';

@Component({
  selector: 'tm-table-text-filter',
  templateUrl: './table-text-filter.component.html',
  styleUrls: ['./table-text-filter.component.scss']
})
export class TableTextFilterComponent implements OnInit {
  @Input() placeholder: string;
  @Input() field: string;
  @Input() value: string;
  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  private filterControl = new FormControl();

  constructor() { }

  ngOnInit() {
    this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(this.valueChanges.bind(this));
  }

  valueChanges(value) {
    this.filterChange.emit({
      field: this.field,
      value: value
    });
  }

}
