import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss'],
})
export class AddCatalogueComponent implements OnDestroy {
  catalogueForm: FormGroup;
  private destroy$ = new Subject();

  get isCatalogueRequired() {
    return this.catalogueForm.controls.name.errors && this.catalogueForm.controls.name.errors.required;
  }

  get isInvalidCatalogueName() {
    return this.catalogueForm.controls.name.errors && this.catalogueForm.controls.name.errors.pattern;
  }

  get isInvalidDescriptionLength() {
    return this.catalogueForm.controls.description.errors && this.catalogueForm.controls.description.errors.invalidLength;
  }

  get isFormValid() {
    return this.catalogueForm.invalid;
  }

  constructor(private matDialogRef: MatDialogRef<AddCatalogueComponent>, private readonly formBuilder: FormBuilder) {
    this.catalogueForm = this.formBuilder.group({
      id: [0],
      image: ['../../assets/images/games-photos/default.png'],
      name: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]+$/), Validators.required]),
      description: ['', this.descriptionLength()],
      amount: [0],
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  saveCatalogue() {
    this.matDialogRef.close(this.catalogueForm.value);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  resetForm() {
    this.catalogueForm.reset();
  }

  private descriptionLength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const desc = control.value;
      if (desc.length > 299) {
        return { invalidLength: true };
      } else {
        return null;
      }
    };
  }
}
