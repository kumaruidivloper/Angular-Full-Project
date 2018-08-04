import { Injectable } from '@angular/core';
import {isDate} from 'util';

@Injectable()
export class DateHandlerService {

  constructor() { }
  public dateToNgxDateFormat(value) {
    const dateVal =  (isDate(value)) ? value : new Date(value);
    return {
      year: dateVal.getFullYear(),
      month: dateVal.getMonth() + 1,
      day: dateVal.getDate()
    };
  }
  public convertToTimeStamp(value) {
    const getTimeStampDate = (value) ? new Date(value.year, value.month - 1, value.day, 0 , 0 , 0 ).getTime() : null;
    return getTimeStampDate;
  }
}
