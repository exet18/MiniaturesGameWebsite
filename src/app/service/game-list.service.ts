import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../interface/game';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private gameItems: Game[] = [
    { id: 0, image: '../../assets/images/games-photos/1.png', name: 'All items', description: '', amount: 0 },
    { id: 1, image: '../../assets/images/games-photos/2.png', name: 'Grand Alliance Bar', description: '', amount: 0 },
    { id: 2, image: '../../assets/images/games-photos/3.png', name: 'Grand Alliance Chaos', description: '', amount: 0 },
    { id: 3, image: '../../assets/images/games-photos/4.png', name: 'Grand Alliance Death', description: '', amount: 0 },
  ];
  private gameList$ = new BehaviorSubject<Game[]>(this.gameItems);

  constructor() {}

  getGameList(): BehaviorSubject<Game[]> {
    return this.gameList$;
  }

  itemDelete(id: number) {
    this.gameItems.splice(
      this.gameItems.findIndex(item => item.id === id),
      1
    );
    this.gameList$.next(this.gameItems);
  }

  addItem(item: Game) {
    item.id = this.gameItems.length
    this.gameItems.push(item);
    this.gameList$.next(this.gameItems);
  }
}
