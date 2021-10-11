import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.scss']
})
export class AddCatalogueComponent implements OnInit {

  inputForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<AddCatalogueComponent>, private readonly formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      id: [0],
      image: ['../../assets/images/games-photos/default.png'],
      name: [''],
      description: [''],
      amount: [0]
    });
  }

  ngOnInit(): void {
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
}
