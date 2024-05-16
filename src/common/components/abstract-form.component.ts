import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export abstract class AbstractFormComponent {
  abstract form: FormGroup

  getControl(name: string) {
    const control = this.form.get(name)
    if(!control) {
      throw Error("Contrôle introuvable")
    }
    return control;
  }

  hasInteraction(control: AbstractControl) {
    return control.touched || control.dirty;
  }

  isInvalid(control: string | AbstractControl) {
    if(typeof control === "string") {
      control = this.getControl(control)
    }
    return this.hasInteraction(control) && control.invalid
  }

  hasError(control: string | AbstractControl, errorCode: string) {
    if(typeof control === "string") {
      control = this.getControl(control)
    }

    return this.hasInteraction(control) && control.hasError(errorCode)
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.onSubmit$()
    }
  }

  abstract onSubmit$(): void

  mustMatch(matchingControl: AbstractControl): ValidatorFn { // Un validateur renvoie une fonction
    return (control): ValidationErrors | null => {
      // Cette fonction utilise un controle et selon une condition renvoie un objet ou null
      return control.value !== matchingControl.value
        ? {
          // un Objet de Type ValidationErrors contiens -> errorCode: value
          mustmatch: "Ne match pas"
        }
        : null
    }
  }
}
