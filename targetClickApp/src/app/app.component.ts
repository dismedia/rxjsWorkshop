import {AfterViewInit, Component, OnInit} from '@angular/core';
import {browserPlatformCreator} from "../targetClick/browserGamePlatform";
import {interval, of} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {moveItFast} from "../targetClick/howToMoveATarget";
import {gameCreator} from "../targetClick/targetClick";
import {distanceToScore1} from "../targetClick/distanceToScore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'targetClickApp';



  ngAfterViewInit(): void {






    const rules={
      minDistance:100,
      distanceToScore:distanceToScore1,
      container:"#targetClick",
      howToMoveTheTarget:moveItFast
    }


      gameCreator(rules,browserPlatformCreator).pipe(


      ).subscribe((a)=>console.log(a))






  }


}
