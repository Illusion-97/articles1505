import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './views/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ArticlesService } from './services/articles.service';
import { EditorComponent } from './views/editor/editor.component';

const routes : Routes = [
  {
    path: "",
    component: ListComponent,
    // Ne se combine pas avec un LazyLoading du module entier dans le module principal
    //loadComponent: () => import('./views/list/list.component').then(m => m.ListComponent)
    //loadComponent: () => ListComponent
    resolve: {
      // indiquer dans une fonction ce qui doit être récupéré pour afficher la page
      articles: () => inject(ArticlesService).all()
    }
  },
  {
    path: 'editor/:id',
    component: EditorComponent
  }
]

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticlesModule { }
