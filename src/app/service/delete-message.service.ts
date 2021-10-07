import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DeleteMessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  itemDeleteMessage(message: string) {
    this.snackBar.open(message, '', {duration: 2000, panelClass: 'snackBar'});
  }
}
