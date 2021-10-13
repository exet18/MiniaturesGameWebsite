import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../interface/game";
import {GameListService} from "../service/game-list.service";
import {
  debounceTime,
  delay, distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
  tap
} from "rxjs/operators";
import {Option} from "../interface/option";
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DeleteMessageService} from "../service/delete-message.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCatalogueComponent} from "../add-catalogue/add-catalogue.component";


@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit, OnDestroy {
  options: Option[] = [
    {type: "a-z", name: "Alphabet (A - Z)"},
    {type: "z-a", name: "Alphabet (Z - A)"},
  ];
  games: Game[] = [];
  gamesCopy: Game[] = [];
  gameForm: FormGroup;
  destroy$ = new Subject();

  constructor(private readonly gameService: GameListService, private readonly formBuilder: FormBuilder, private readonly snackMessage: DeleteMessageService, private matDialog: MatDialog) {
    this.gameForm = this.formBuilder.group({
        input: [''],
        selectValue: ['']
      }
    );
  }

  ngOnInit(): void {
    this.selectValue.setValue("Date of Creation (latest first)");
    this.gameService.getGameList().pipe(
      tap(gamesList => {
        this.games = gamesList;
        this.gamesCopy = this.games.slice();
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    this.inputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      tap(value => {
        this.games = this.gamesCopy;
        this.search(value);
      })
    ).subscribe();

  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  private search(value: string) {
    const filterValue = value.toLowerCase();
    this.games = this.games.filter(games => games.name.toLowerCase().includes(filterValue));
  }

  sort() {
    if (this.selectValue.value === "a-z") {
      this.sortByNameA_Z();
    } else if (this.selectValue.value === "z-a") {
      this.sortByNameZ_A();
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
    this.inputControl.setValue('');
    this.snackMessage.itemDeleteMessage(name + " deleted!");
  }

  get inputControl(): FormControl {
    return this.gameForm.get('input') as FormControl;
  }

  get selectValue(): FormControl {
    return this.gameForm.get('selectValue') as FormControl;
  }

  addCatalogue() {
    this.matDialog.open(AddCatalogueComponent, {
      width: "488px",
      height: "830px"
    }).afterClosed().pipe(
      filter(value => this.checkValid(value)),
      tap(result => this.gameService.addItem(result)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  checkValid(value: any) {
    return value && value.name !== null && value.name !== '';
  }
}
