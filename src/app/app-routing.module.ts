import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { adminGuard, authGuard } from 'src/users/auth/services/auth.service';
import {NotFoundComponent} from "./views/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "articles",
    canMatch: [authGuard], // Fonctionne comme canActivate tout en empêchant le chargement d'un module
    loadChildren: () => import('src/articles/articles.module').then(m => m.ArticlesModule)
  },
  {
    path: "users",
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('src/users/users.module').then(m => m.UsersModule)
  },
  {
    // Récupère toutes les routes non définies au préalable
    path: "**",
    //component: NotFoundComponent,
    loadComponent: () => import('./views/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
