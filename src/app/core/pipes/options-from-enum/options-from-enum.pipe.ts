import { Pipe, PipeTransform } from '@angular/core';
import { Option } from './option.model';

@Pipe({
  name: 'optionsFromEnum'
})
export class OptionsFromEnumPipe implements PipeTransform {

  transform(enumeration: {[key: string]: string}, args?: any): Option[] {
    return Object
      .keys(enumeration)
      .map(key => {
        return {
          value: key,
          label: enumeration[key]
        };
      });
  }

}
