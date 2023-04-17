import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from './utility.service';

@Injectable()
export class FormValidationService {

  constructor(private utils: UtilityService) { }

  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: { markAsTouched: () => void; controls: any[]; }) => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => {
          this.markFormGroupTouched(c);
        });
      }
    });
    this.utils.SetFocus('input.ng-invalid, select.ng-invalid');
  }

  public setFocusNameInput() {
    this.utils.SetFocus('input.name-input');
  }


  public markFormGroupUntouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: { markAsUntouched: () => void; controls: any[]; }) => {
      control.markAsUntouched();

      if (control.controls) {
        control.controls.forEach(c => {
          this.markFormGroupUntouched(c);
        });
      }
    });
  }
}

