import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article } from 'src/articles/models/article';
import { ArticlesService } from 'src/articles/services/articles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  articles!: Observable<Article[]>;

  constructor(private service : ArticlesService, route: ActivatedRoute) {
    /*route.data.subscribe(data => {
      const articles = data['articles']
      this.articles = articles
    })*/
    /*route.data.subscribe(({articles}) => { // déconstruction de data pour récupérer uniquement articles
      this.articles = articles
    })*/

    /*const dataObs : Observable<Data> = route.data;
    const articlesObs : Observable<Article[]> = dataObs.pipe(map(({articles}) => articles))*/
    this.articles = route.data.pipe(map(({articles}) => articles))
  }

  getAll() {
    this.articles = this.service.all()
  }
}