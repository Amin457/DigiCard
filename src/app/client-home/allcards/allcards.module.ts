import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllcardsPageRoutingModule } from './allcards-routing.module';

import { AllcardsPage } from './allcards.page';
import { ListpartenairePipe } from './pipes/listpartenaire.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllcardsPageRoutingModule
  ],
  declarations: [AllcardsPage, ListpartenairePipe]
})
export class AllcardsPageModule {}
