import { Pipe, PipeTransform } from '@angular/core';
import { Promo } from '../model/promo';

@Pipe({
  name: 'promo'
})
export class PromoPipe implements PipeTransform {
  transform(value: Promo[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p =>(p.nom.toLowerCase().indexOf(Search.toLowerCase()) > -1));
  }

}
//p =>(p.nom.toLowerCase().includes(Search))