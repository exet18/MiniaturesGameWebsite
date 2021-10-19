import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../interface/game';
import { GameListService } from '../service/game-list.service';
import { debounceTime, distinctUntilChanged, filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from '../service/message.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCatalogueComponent } from '../add-catalogue/add-catalogue.component';
import { catalogueSort } from './options';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss'],
})
export class CatalogueListComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  private gamesCopy: Game[] = [];
  gameForm: FormGroup;
  private destroy$ = new Subject();
  sortOptions = catalogueSort;
  optionKey = Object.keys(this.sortOptions);

  get searchControl(): FormControl {
    return this.gameForm.get('search') as FormControl;
  }

  get selectControl(): FormControl {
    return this.gameForm.get('select') as FormControl;
  }

  constructor(
    private readonly gameService: GameListService,
    private readonly formBuilder: FormBuilder,
    private readonly snackMessage: MessageService,
    private readonly matDialog: MatDialog
  ) {
    this.gameForm = this.formBuilder.group({
      search: [''],
      select: ['lf'],
    });
  }

  ngOnInit(): void {
    this.gameService
      .getGameList()
      .pipe(
        tap(gamesList => {
          this.games = gamesList;
          this.gamesCopy = this.games.slice();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        tap(value => {
          this.games = this.gamesCopy;
          this.search(value);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  sort() {
    switch (this.selectControl.value) {
      case 'az': {
        this.sortByNameA_Z();
        break;
      }
      case 'za': {
        this.sortByNameZ_A();
        break;
      }
      default: {
        this.sortByNameA_Z();
        break;
      }
    }
  }

  sortByNameA_Z() {
    this.games = this.games.sort((first, second) => {
      if (first.name > second.name) {
        return 1;
      }
      if (first.name < second.name) {
        return -1;
      }
      return 0;
    });
  }

  sortByNameZ_A() {
    this.games = this.games.sort((first, second) => {
      if (first.name < second.name) {
        return 1;
      }
      if (first.name > second.name) {
        return -1;
      }
      return 0;
    });
  }

  deleteGame(id: number, name: string) {
    this.gameService.itemDelete(id);
    this.searchControl.setValue('');
    this.snackMessage.itemDeleteMessage(name + ' deleted!');
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
        tap(result => this.gameService.addItem(result)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  isCatalogueValid(value: Game) {
    return value && value.name !== null && value.name !== '';
  }

  private search(value: string) {
    const filterValue = value.toLowerCase();
    this.games = this.games.filter(games => games.name.toLowerCase().includes(filterValue));
  }
}
