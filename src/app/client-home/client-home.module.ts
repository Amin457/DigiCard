import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ClientHomePage } from './client-home.page';
import { ClientHomePageRoutingModule } from './client-home-routing.module';
import { CommonModule } from '@angular/common';
import { ListCartePipe } from './pipes/list-carte.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientHomePageRoutingModule
  ],
  declarations: [ClientHomePage, ListCartePipe]
})
export class ClientHomePageModule {}
