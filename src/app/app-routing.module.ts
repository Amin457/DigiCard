import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddCreateComponent } from './components/add-create/add-create.component';
import { DetailcardComponent } from './components/detailcard/detailcard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { LocalisationComponent } from './components/localisation/localisation.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PromoPartComponent } from './components/promo-part/promo-part.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'home/detailcard/:id1/:id2', component: DetailcardComponent },
      {path: 'home/detailcard/:id1/:id2/reclamation', component: ReclamationComponent },
      {path: 'home/detailcard/:id1/:id2/localisation', component: LocalisationComponent },
      {path: 'home/detailcard/:id1/:id2/feedback', component: FeedbackComponent },
      {path: 'home/detailcard/:id1/:id2/promopart', component: PromoPartComponent },
      {path: 'home/detailcard/:id1/:id2/game', component: GameComponent },
      {path: 'newcard',component: NewCardComponent},
      {path: 'notifications',component: NotificationsComponent},
      {path: 'promotion',component: PromotionComponent},
      {path: 'newcard/:id_part/add-create',component: AddCreateComponent}
    ],canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
