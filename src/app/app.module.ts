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
@NgModule({
  declarations:
    [AppComponent,
    ListCartePipe,
    ListpartenairePipe,
    DetailcardComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    NewCardComponent,
    ProfilComponent,
    PromotionComponent,
    RegisterComponent
  ],
  entryComponents: [],
  imports: [
    NgxQRCodeModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
