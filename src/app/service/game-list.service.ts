import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Game} from "../interface/game";

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  private gameList$ = new BehaviorSubject<Game[]>([]);
  private gameItems: Game[] = [
    {id: 1, image: "../../assets/images/games-photos/1.png", name: "All items", description: '', amount: 0},
    {id: 2, image: "../../assets/images/games-photos/2.png", name: "Grand Alliance Bar", description: '', amount: 0},
    {id: 3, image: "../../assets/images/games-photos/3.png", name: "Grand Alliance Chaos", description: '', amount: 0},
    {id: 4, image: "../../assets/images/games-photos/4.png", name: "Grand Alliance Death", description: '', amount: 0},
  ];

  constructor() {
    this.gameList$.next(this.gameItems);
  }

  getGameList(): Observable<Game[]> {
    return this.gameList$;
  }

  itemDelete(id: number) {
    this.gameItems.forEach((item, index) => {
      if (item.id === id) {
        this.gameItems.splice(index, 1);
      }
    });
    this.gameList$.next(this.gameItems);
  }

  addItem(item: Game) {
    this.gameItems.push(item);
    this.gameList$.next(this.gameItems);
  }
}

