import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/users/models/user';
import { UserService } from 'src/users/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  getAll() {
    this.users = this.service.all()
  }

  users: Observable<User[]>;

  constructor(route: ActivatedRoute, private service: UserService) {
    this.users = route.data.pipe(map(({users}) => users))
  }

}
