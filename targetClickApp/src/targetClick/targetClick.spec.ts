import {TestBed, async} from '@angular/core/testing';
import {from, noop, Observable, Observer, of, empty, EMPTY} from "rxjs";
import {filter, map, mergeMap, scan, tap} from "rxjs/operators";


const logObserver: Observer<any> = {
  next: ((a) => console.log(a)),
  error: noop,
  complete: (() => {
    console.log("completed")
  })
}


describe('target click flow', () => {

  it('should emit result', (done) => {

    const rules: GameRules = {
      distanceToScore: (a) => 1,
      minDistance:4
    }


    const platformCreator = () => () => of({clickDistance:1} as GameClickAction)

    gameCreator(rules, platformCreator).subscribe((a) => {

      expect(a).toBeTruthy();
      done()
    })


  });

  it('should create platform', (done) => {


    const rules: GameRules = {
      distanceToScore: (a) => 1,
      minDistance:4
    };


    const platformCreator = (p) => () => {
      done();
      return EMPTY
    };

    gameCreator(rules, platformCreator).subscribe((a) => {})

  });

  it('should add score to platform on every click', (done) => {


    const rules: GameRules = {
      distanceToScore: (a) => a,
      minDistance:10
    };


    const platformCreator = (p) => () => {

      return from([1,100,5])
        .pipe(map(a=>({clickDistance:a})))
    };

    gameCreator(rules, platformCreator).subscribe((a) => {

      console.log(a)
    },noop,()=>done())

  });




})



interface GameRules {

  minDistance:number
  distanceToScore(distance: number): number

}

interface GameResults {

}

interface GameState {

  score: number;

}

interface RenderState{
  position:{x:number,y:number}
}

interface GameClickAction {
  clickDistance:number
}


interface GamePlatform {
  (state: Observable<RenderState>): Observable<GameClickAction>

}

interface GamePlatformCreator {
  (gameParams: GameRules): GamePlatform
}

interface GameCreator {
  (params: GameRules, platformCreator: GamePlatformCreator): Observable<GameResults>
}


const gameCreator: GameCreator = (rules, creator) => {


  const initialState:GameState={
    score:0
  }

  let renderState:Observable<RenderState>

  const platform: GamePlatform = creator(rules)

  return platform(renderState).pipe(

    filter((a)=>a.clickDistance<rules.minDistance),
    scan((acc:GameState,clickAction:GameClickAction)=>{

      return {
        score:acc.score+rules.distanceToScore(clickAction.clickDistance)

      }as GameState
    },initialState)
  )


  //return of({} as GameResults)
}
