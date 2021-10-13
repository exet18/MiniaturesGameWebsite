import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss']
})
export class AddCatalogueComponent implements OnInit, OnDestroy {

  inputForm: FormGroup;
  destroy$ = new Subject();

  get descriptionControl(): FormControl {
    return this.inputForm.get('description') as FormControl;
  }

  get nameValidRequired() {
    return this.inputForm.controls.name.errors && this.inputForm.controls.name.errors.required;
  }

  get validCatalogueName() {
    return this.inputForm.controls.name.errors && this.inputForm.controls.name.errors.pattern;
  }

  get validDescriptionLength() {
    return this.inputForm.controls.description.errors && this.inputForm.controls.description.errors.invalidLength;
  }

  get validForm() {
    return this.validCatalogueName || this.validDescriptionLength;
  }

  constructor(private matDialogRef: MatDialogRef<AddCatalogueComponent>, private readonly formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      id: [0],
      image: ['../../assets/images/games-photos/default.png'],
      name: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]+$/), Validators.required]),
      description: ['', this.descriptionLength()],
      amount: [0]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  saveCatalogue() {
    this.matDialogRef.close(this.inputForm.value);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  resetForm() {
    this.inputForm.reset();
  }

  private descriptionLength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const desc = control.value;
      if (desc.length > 299) {
        return {invalidLength: true};
      } else {
        return null;
      }
    };
  }
}
