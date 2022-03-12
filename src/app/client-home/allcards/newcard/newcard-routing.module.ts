import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcardPage } from './newcard.page';

const routes: Routes = [
  {
    path: '',
    component: NewcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcardPageRoutingModule {}
