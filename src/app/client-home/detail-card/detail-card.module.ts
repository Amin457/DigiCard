import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCardPageRoutingModule } from './detail-card-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DetailCardPage } from './detail-card.page';

@NgModule({
  imports: [
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCardPageRoutingModule
  ],
  declarations: [DetailCardPage]
})
export class DetailCardPageModule {}
