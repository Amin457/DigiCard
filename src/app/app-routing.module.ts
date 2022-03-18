import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailcardComponent } from './components/detailcard/detailcard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
      {path: 'newcard',component: NewCardComponent},
      {path: 'promotion',component: PromotionComponent},
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
