import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ClientHomePage } from './client-home.page';
import { ClientHomePageRoutingModule } from './client-home-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientHomePageRoutingModule
  ],
  declarations: [ClientHomePage]
})
export class ClientHomePageModule {}
