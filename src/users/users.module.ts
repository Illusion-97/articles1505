import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './views/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    resolve: {
      users : () => inject(UserService).all()
    }
  }
]

@NgModule({
  declarations: [
    ListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
