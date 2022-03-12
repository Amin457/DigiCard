import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcardsPage } from './allcards.page';

const routes: Routes = [
  {
    path: '',
    component: AllcardsPage
  },
  {
    path: 'newcard',
    loadChildren: () => import('./newcard/newcard.module').then( m => m.NewcardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllcardsPageRoutingModule {}
