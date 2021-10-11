import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddCatalogueComponent} from "../add-catalogue/add-catalogue.component";
import {GameListService} from "../service/game-list.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss']
})
export class SideBarMenuComponent implements OnInit {

  constructor(private matDialog: MatDialog, private readonly games: GameListService) {
  }

  ngOnInit(): void {
  }

  addCatalogue() {
    this.matDialog.open(AddCatalogueComponent, {
      data: {},
      width: "488px",
      height: "800px"
    })
      .afterClosed().pipe(
      filter(value => value && this.checkValid(value))
    ).subscribe(result => this.games.addItem(result))
    ;
  }

  checkValid(value: any) {
    return value.name !== null && value.name !== '';
  }
}
