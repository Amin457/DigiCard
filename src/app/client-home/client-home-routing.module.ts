import { NgModule } from '@angular/core';
import { ClientHomePage } from './client-home.page';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: ClientHomePage
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'detail-card',
    loadChildren: () => import('./detail-card/detail-card.module').then( m => m.DetailCardPageModule)
  },
  {
    path: 'allcards',
    loadChildren: () => import('./allcards/allcards.module').then( m => m.AllcardsPageModule)
  },
  {
    path: 'promo',
    loadChildren: () => import('./promo/promo.module').then( m => m.PromoPageModule)
  },
];


@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientHomePageRoutingModule {}
