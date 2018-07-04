import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => (row.usuario.nombres).toLowerCase().indexOf(query) > -1); /*Letras*/
      /*return _.filter(array, row => (row.numero).toString().indexOf(query) > -1); Numeros*/
    }
    return array;
  }

}
