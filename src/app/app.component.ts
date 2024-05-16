import { Component } from '@angular/core';
import { AuthService } from 'src/users/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'articles';

  constructor(protected service: AuthService) {

  }
}
