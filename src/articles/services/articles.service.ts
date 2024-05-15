import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { GenericService } from 'src/common/services/generic-service';

@Injectable({ // Permet une récupération par constructeur
  providedIn: 'root'
})
export class ArticlesService extends GenericService<Article> {

  readonly ENDPOINT : string = "/articles"

  constructor(http : HttpClient) {
    super(http) // appel au constructeur parent
  }

  // écraser une fonction présente dans la classe parent
  override update(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.ENDPOINT}/${article.id}`, article)
  }

}
