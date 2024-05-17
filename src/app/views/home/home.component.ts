import { Component } from '@angular/core';
import {AuthService} from "../../../users/auth/services/auth.service";
import {ArticlesService} from "../../../articles/services/articles.service";
import {UserService} from "../../../users/services/user.service";
import {first, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  articlesCounts: Observable<number>
  usersCount: Observable<number>
  constructor(protected auth: AuthService, articles: ArticlesService, users: UserService) {
    this.usersCount = auth.isAdmin ? users.all().pipe(first(),map(users => users.length)) : of(0)
    this.articlesCounts = auth.isLogged ? articles.all().pipe(first(),map(articles => articles.length)) : of(0)
  }
}
