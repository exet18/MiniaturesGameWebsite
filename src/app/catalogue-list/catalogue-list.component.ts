import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../interface/game";
import {GameListService} from "../service/game-list.service";
import {
  map,
  startWith,
  takeUntil,
  tap
} from "rxjs/operators";
import {Option} from "../interface/option";
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DeleteMessageService} from "../service/delete-message.service";


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
  inputForm: FormGroup;
  destroy$ = new Subject();
  searchGames$: Observable<Game[]> | undefined;
  sortForm: FormGroup;

  constructor(private readonly gameService: GameListService, private readonly formBuilder: FormBuilder, private readonly snackMessage: DeleteMessageService) {
    this.inputForm = this.formBuilder.group({
        input: ['']
      }
    );
    this.sortForm = this.formBuilder.group({
      selectValue: ['']
    });
  }

  ngOnInit(): void {
    this.selectValue.setValue("Date of Creation (latest first)");
    this.gameService.getGameList().pipe(
      tap(gamesList => {
        this.games = gamesList;
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    this.searchGames$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value => this._search(value))
    );

  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }

  private _search(value: string) {
    const filterValue = value.toLowerCase();
    return this.games.filter(games => games.name.toLowerCase().includes(filterValue));
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
    this.updateList();
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
    this.searchGames$ = this.searchGames$?.pipe(
      tap(value => value),
    );
  }

  deleteGame(id: number, name: string) {
    this.gameService.itemDelete(id);
    this.updateList();
    this.inputControl.setValue('');
    this.snackMessage.itemDeleteMessage(name + " deleted!");
  }

  get inputControl(): FormControl {
    return this.inputForm.controls['input'] as FormControl;
  }

  get selectValue(): FormControl {
    return this.sortForm.controls['selectValue'] as FormControl;
  }

  updateList() {
    this.searchGames$ = this.searchGames$?.pipe(
      tap(value => value),
    );
  }

}
