import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailcardComponent } from './components/detailcard/detailcard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RegisterComponent } from './components/register/register.component';
import { ListCartePipe } from './pipes/list-carte.pipe';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ListpartenairePipe } from './pipes/listpartenaire.pipe';
import { AddCreateComponent } from './components/add-create/add-create.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { PromoPartComponent } from './components/promo-part/promo-part.component';
import { SwiperModule } from 'swiper/angular';
import { PromoPipe } from './pipes/promo.pipe';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations:
    [AppComponent,
      GameComponent,
    PromoPartComponent,
    LocalisationComponent,
    ListCartePipe,
    ReclamationComponent,
    NotificationsComponent,
    FeedbackComponent,
    AddCreateComponent,
    ListpartenairePipe,
    DetailcardComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    NewCardComponent,
    ProfilComponent,
    PromotionComponent,
    RegisterComponent,
    PromoPipe
  ],
  entryComponents: [],
  imports: [
    SwiperModule,
    NgxQRCodeModule,
    NgxBarcodeModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
