import { NgModule } from "@angular/core";
import { StepperComponent } from "./components/stepper/stepper.component";
import { StepComponent } from "./components/stepper/step/step.component";

@NgModule({
    declarations: [
        StepperComponent,
        StepComponent
    ],
    exports: [
        StepperComponent,
        StepComponent
    ]
})
export class SharedModule {

}