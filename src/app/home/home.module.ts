import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

