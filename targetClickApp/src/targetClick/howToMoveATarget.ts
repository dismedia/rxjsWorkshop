import {interval, merge} from "rxjs";
import {delay, map, startWith} from "rxjs/operators";

// export const moveItFast=interval(10000).pipe(startWith({}),
//
// }))

const base=1000;
const seenFor=300;

const showIt = interval(base).pipe(

  map(() => {

    return {
      position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight},

    }
  })
)

const hideIt = interval(base).pipe(

  delay(seenFor),
  map(() => {

    return {
      position: {x: -1000, y: -1000},
      //position: {x: 0, y: 0},

    }
  })
)


export const moveItFast=merge(showIt,hideIt);
