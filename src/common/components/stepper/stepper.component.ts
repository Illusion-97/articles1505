import { AfterContentInit, AfterViewInit, Component, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { StepComponent } from './step/step.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements AfterContentInit, AfterViewInit {

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>
  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  @ViewChildren(HTMLButtonElement)
  buttons!: QueryList<HTMLButtonElement>

  set index(value : number) {
    this.currentIndex.next(value)
  }


  ngAfterViewInit(): void {
    /*console.log("AfterViewInit")
    console.log("Buttons",this.buttons)
    console.log("Steps",this.steps)*/
  }

  ngAfterContentInit(): void {
    /*console.log("AfterContentInit")
    console.log("Buttons",this.buttons)
    console.log("Steps",this.steps)*/
    this.steps.forEach((step, index) => {
      step.index = index
      step.currentIndex = this.currentIndex
    })
  }

  previous() {
    this.index = this.currentIndex.value === 0 ? this.steps.length - 1 : this.currentIndex.value - 1
    
  }

  next() {
    this.index = this.currentIndex.value === this.steps.length - 1 ? 0 : this.currentIndex.value + 1
  }
}
