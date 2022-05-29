import { Pipe, PipeTransform } from '@angular/core';
import { Partenaire } from 'src/app/model/partenaire';

@Pipe({
  name: 'listpartenaire'
})
export class ListpartenairePipe implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  transform(value: Partenaire[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
    }
    return  value.filter(p =>(p.societe.toLowerCase().indexOf(Search.toLowerCase()) > -1));
  }

}

//.toLowerCase().includes(Search)))