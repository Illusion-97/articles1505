import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './views/list/list.component';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ArticlesService } from './services/articles.service';
import { EditorComponent, editorResolver } from './views/editor/editor.component';
import { catchError, of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from 'src/common/components/stepper/stepper.component';
import { StepComponent } from 'src/common/components/stepper/step/step.component';
import { SharedModule } from 'src/common/common.module';

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
    component: EditorComponent,
    resolve: {
      article: editorResolver
    }
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
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticlesModule { }
