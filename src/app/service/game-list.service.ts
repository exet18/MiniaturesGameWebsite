import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Games} from "../interface/games";

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  private gameList = new BehaviorSubject<Games[]>([]);
  private gameItems: Games[] = [
    {image: "../../assets/images/games-photos/1.png", name: "All items", amount: 0},
    {image: "../../assets/images/games-photos/2.png", name: "Grand Alliance Bar", amount: 0},
    {image: "../../assets/images/games-photos/3.png", name: "Grand Alliance Chaos", amount: 0},
    {image: "../../assets/images/games-photos/4.png", name: "Grand Alliance Death", amount: 0},
  ];

  constructor() {
    this.gameList.next(this.gameItems);
  }

  getGameList() {
    return this.gameList;
  }
}

