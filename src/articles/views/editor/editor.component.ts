import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription, catchError, finalize, of, throwError } from 'rxjs';
import { Article } from 'src/articles/models/article';
import { ArticlesService } from 'src/articles/services/articles.service';
import { AbstractFormComponent } from 'src/common/components/abstract-form.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends AbstractFormComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(""),
    alt: new FormControl("", {validators: [Validators.required]}),
    titre: new FormControl("", {validators: [Validators.required]}),
    description: new FormControl("", {validators: [Validators.required]}),
    lien: new FormControl("", {validators: [Validators.required]})
  })

  constructor(private service: ArticlesService, private router: Router, route: ActivatedRoute) {
    super()
    route.data.subscribe(({article}) => {
      if (article) this.form.patchValue(article)
      else this.form.reset()
    })
  }

  onSubmit$() {
    const observable = this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value)
    const s : Subscription = observable.pipe(finalize(() => s.unsubscribe()))
    .subscribe(() => this.router.navigate(['/articles']))
  }
}

export const editorResolver : ResolveFn<Article | undefined> = (route) => {
  const id : number = +(route.paramMap.get('id') ?? "0")
  const router = inject(Router)
  return id 
  ? inject(ArticlesService).byId(id).pipe(catchError(err => {
    router.navigate(['/articles/editor/0'])
    return throwError(() => err)
  })) 
  : of(undefined)
}