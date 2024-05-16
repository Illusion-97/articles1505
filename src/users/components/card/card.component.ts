import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { User } from 'src/users/models/user';
import { UserService } from 'src/users/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() user! : User // Utilisation d'un modele
  @Output() userDeleted: EventEmitter<never> = new EventEmitter<never>()

  constructor(private service: UserService) {

  }

  delete(id: number){
    const s: Subscription = this.service.delete(id)
      .pipe(finalize(() => s.unsubscribe())) // est exécuté une fois après la première réponse de l'observable
      .subscribe(() => this.userDeleted.emit())
  }
}
