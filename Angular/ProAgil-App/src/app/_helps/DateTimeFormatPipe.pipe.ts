import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constatntes } from '../util/Constatntes';

@Pipe({
  name: 'DateTimeFormatPipe'
})
export class DateTimeFormatPipePipe  extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constatntes.DATE_TIME_FMT);
  }

}
