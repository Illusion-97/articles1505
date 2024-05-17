import { Component } from '@angular/core';
import { AuthService } from 'src/users/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected service: AuthService) {

  }
}
