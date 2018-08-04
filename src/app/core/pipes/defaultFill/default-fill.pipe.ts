import {  Pipe,  PipeTransform} from '@angular/core';

@Pipe({
  name: 'defaultFill'
})
export class DefaultFillPipe implements PipeTransform {
  private defaultText = '--';
  public transform(value: string): string {
    return (typeof value === 'string' && value.trim() !== '') ? value : this.defaultText;
  }
}
