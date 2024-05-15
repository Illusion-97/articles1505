import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { Article } from 'src/articles/models/article';
import { ArticlesService } from 'src/articles/services/articles.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // article : {titre: string} = {titre: "Un titre"} | Définition de type "à la volée"
  @Input() article! : Article // Utilisation d'un modele
  @Output() articleDeleted: EventEmitter<never> = new EventEmitter<never>()

  constructor(private service: ArticlesService) {

  }

  delete(id: number){
    const s: Subscription = this.service.delete(id)
      .pipe(finalize(() => s.unsubscribe())) // est exécuté une fois après la première réponse de l'observable
      .subscribe(() => this.articleDeleted.emit())
  }
}
