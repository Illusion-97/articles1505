import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFormComponent } from 'src/common/components/abstract-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent {
  
  form: FormGroup = new FormGroup({
    email: new FormControl("", {validators: [Validators.required]}),
    password: new FormControl("", {validators: [Validators.required]}),
  })

  constructor(protected service: AuthService, private router: Router) {
    super()
  }

  onSubmit$(): void {
    this.service.login(this.form.value).subscribe(() => this.router.navigate(['/articles']))
  }

  
  setRemeber(inputEvent: Event) {
    //@ts-ignore
    this.service.remember = inputEvent.target.checked

    //this.service.remember = (inputEvent.target as HTMLInputElement).checked
  }
}
