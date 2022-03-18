import { Pipe, PipeTransform } from '@angular/core';
import { Carte } from 'src/app/model/carte';

@Pipe({
  name: 'listCarte'
})
export class ListCartePipe implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  transform(value: Carte[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p =>(p.boutique.toLowerCase().includes(Search)));
  }
}
