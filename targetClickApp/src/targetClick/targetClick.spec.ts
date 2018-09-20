import {TestBed, async} from '@angular/core/testing';
import {from, noop, Observable, Observer, of, EMPTY} from "rxjs";
import {filter, map, mergeMap, scan, skip, tap} from "rxjs/operators";
import {GameClickAction, gameCreator, GameRules} from "./targetClick";


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
      minDistance: 4,
      container: null,
      howToMoveTheTarget:null

    }


    const platformCreator = () => () => of({clickDistance: 1} as GameClickAction)

    gameCreator(rules, platformCreator).subscribe((a) => {

      expect(a).toBeTruthy();
      expect(a.score).toBeTruthy()
      done()
    })


  });

  it('should create platform', (done) => {


    const rules: GameRules = {
      distanceToScore: (a) => 1,
      minDistance: 4,
      container: null,
      howToMoveTheTarget:null
    };


    const platformCreator = (p) => () => {
      done();
      return EMPTY
    };

    gameCreator(rules, platformCreator).subscribe((a) => {
    })

  });

  it('should add score to platform on every click in distance range', (done) => {


    const rules: GameRules = {
      distanceToScore: (a) => a,
      minDistance: 10,
      container: null,
      howToMoveTheTarget:null
    };


    const platformCreator = (p) => () => {

      return from([1, 100, 5])
        .pipe(map(a => ({clickDistance: a})))
    };

    gameCreator(rules, platformCreator).pipe(skip(1)).subscribe((a) => {

      expect(a.score).toEqual(6)

    }, noop, () => done())

  });


})


