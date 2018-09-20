import {Observable} from "rxjs";
import {filter, scan} from "rxjs/operators";

export interface GameRules {

  container:any
  minDistance:number
  distanceToScore(distance: number): number
  howToMoveTheTarget:Observable<TargetState>


}



export interface GameState {

  score: number;

}

export interface TargetState{
  position:{x:number,y:number}
  showTarget:boolean
}

export interface GameClickAction {
  clickDistance:number
}


interface GamePlatform {
  (state: Observable<TargetState>): Observable<GameClickAction>

}

export interface GamePlatformCreator {
  (rules: GameRules): GamePlatform
}

interface GameCreator {
  (rules: GameRules, platformCreator: GamePlatformCreator): Observable<GameState>
}


export const gameCreator: GameCreator = (rules, creator) => {


  const initialState:GameState={
    score:0
  }

  const platform: GamePlatform = creator(rules)

  return platform(rules.howToMoveTheTarget).pipe(

    filter((a)=>a.clickDistance<rules.minDistance),
    scan((acc:GameState,clickAction:GameClickAction)=>{


      return {
        score:acc.score+rules.distanceToScore(clickAction.clickDistance)

      }as GameState
    },initialState)
  )


  //return of({} as GameResults)
}
