import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ArticlesService } from 'src/articles/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StepComponent } from 'src/common/components/stepper/step/step.component';
import { StepperComponent } from 'src/common/components/stepper/stepper.component';
import { CardComponent } from 'src/articles/components/card/card.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent, StepComponent, StepperComponent, CardComponent ],
      providers: [
        {
          provide: ArticlesService,
          useClass: MockArticleService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data : of({articles : []})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have new Article button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Nouvel Article');
  })

  it('Article Observable should not be undefined', () => {
    expect(component.articles).not.toBeUndefined()
  })

  it("getText should return Hello", () => {
    expect(component.getText()).toBe('Hello')
  })

  it("get All should return a valid observable", () => {
    component.getAll()
    expect(component.articles).not.toBeUndefined()
  })
});

class MockArticleService {
  all() {
    return of([])
  }
}