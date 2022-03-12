import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcardPageRoutingModule } from './newcard-routing.module';

import { NewcardPage } from './newcard.page';

import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { AddComponent} from './add/add.component';
@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NewcardPageRoutingModule
  ],
  declarations: [NewcardPage,CreateComponent,AddComponent]
})
export class NewcardPageModule {}
