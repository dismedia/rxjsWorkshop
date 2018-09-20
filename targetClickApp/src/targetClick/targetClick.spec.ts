import {TestBed, async} from '@angular/core/testing';
import {Observable, of} from "rxjs";

describe('terget click flow', () => {

  it('should emit result', () => {



    expect(true).toBeTruthy()

  });

});


interface GameParams{

}

interface GameResults{

}

interface GameState{

}

interface GameAction{

}

interface GameCreator{
  (params:GameParams,platform:GamePlatformCreator):Observable<GameResults>
}

interface GamePlatformCreator{
  (gameParams:GameParams):(state:Observable<GameState>)=>Observable<GameAction>
}



const gameCreator:GameCreator=(params,creator)=>{


  return of({} as GameResults)
}
