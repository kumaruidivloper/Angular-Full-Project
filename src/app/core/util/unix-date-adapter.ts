import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class UnixDateAdapter extends NgbDateAdapter<number> {
  fromModel(timestamp: number): NgbDateStruct {
    const date = new Date(timestamp);
    return date ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() || 1} : null;
  }

  toModel(date: NgbDateStruct): number {
    return date ? new Date(date.year, date.month - 1, date.day, 0, 0, 0).getTime() : null;
  }
}
