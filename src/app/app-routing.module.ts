import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'client',
    loadChildren: () => import('./client-home/client-home.module').then( m => m.ClientHomePageModule)
  }
];

@NgModule({
  imports: [
    BrowserModule,CommonModule,RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
