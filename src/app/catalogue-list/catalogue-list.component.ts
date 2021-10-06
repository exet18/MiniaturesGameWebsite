import {Component, OnInit} from '@angular/core';
import {Games} from "../interface/games";
import {GameListService} from "../service/game-list.service";
import {tap} from "rxjs/operators";
import {Options} from "../interface/options";


@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {
  sortOption = "Date of Creation (latest first)";
  options: Options[] = [
    {type: "a-z", name: "Alphabet (A - Z)"},
    {type: "z-a", name: "Alphabet (Z - A)"},
  ];
  games: Games[] = [];

  constructor(private readonly gameService: GameListService) {
  }

  ngOnInit(): void {
    this.gameService.getGameList().pipe(
      tap(item => {
        this.games = item;
      })
    ).subscribe();
  }

  sort() {
    if (this.sortOption === "a-z") {
      this.sortByNameA_Z();
    } else if (this.sortOption === "z-a") {
      this.sortByNameZ_A();
    }
  }

  sortByNameA_Z() {
    this.games.sort(function (first, second) {
      //is greater than 0, sorting will put second at a lower index than first.
      if (first.name > second.name) {
        return 1;
      }
      //is less than 0, sorting will put first at a lower index than second, that is, first comes first.
      if (first.name < second.name) {
        return -1;
      }
      //will return 0, sorting will leave first and second unchanged with respect to each other
      return 0;
    });
  }

  sortByNameZ_A() {
    this.sortByNameA_Z();
    this.games.reverse();
  }
}
