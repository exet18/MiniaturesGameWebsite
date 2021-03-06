import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCatalogueComponent } from '../add-catalogue/add-catalogue.component';
import { GameListService } from '../service/game-list.service';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(private matDialog: MatDialog, private readonly games: GameListService) {}

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  addCatalogue() {
    this.matDialog
      .open(AddCatalogueComponent, {
        width: '488px',
        height: '830px',
        autoFocus: false,
        panelClass: 'dialog',
      })
      .afterClosed()
      .pipe(
        filter(value => this.isCatalogueValid(value)),
        tap(result => this.games.addItem(result)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  isCatalogueValid(value: any) {
    return value && value.name !== null && value.name !== '';
  }
}
