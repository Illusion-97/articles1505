import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {

  index: number = 0
  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  
  get left() {
    return (this.index - this.currentIndex.value) * 100
  }

}
