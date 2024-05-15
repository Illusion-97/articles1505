import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { ArticlesService } from 'src/articles/services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(""),
    alt: new FormControl("", {validators: [Validators.required]}),
    titre: new FormControl("", {validators: [Validators.required]}),
    description: new FormControl("", {validators: [Validators.required]}),
    lien: new FormControl("", {validators: [Validators.required]})
  })

  constructor(private service: ArticlesService, private router: Router, route: ActivatedRoute) {

  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.onSubmit$();
    }
  }

  onSubmit$() {
    const observable = this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value)
    const s : Subscription = observable.pipe(finalize(() => s.unsubscribe()))
    .subscribe(() => this.router.navigate(['/articles']))
  }
}
