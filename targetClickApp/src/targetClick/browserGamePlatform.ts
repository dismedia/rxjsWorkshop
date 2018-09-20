import {fromEvent, Observable, of} from "rxjs";
import {GameClickAction, GamePlatformCreator, GameRules, TargetState} from "./targetClick";
import {map, tap} from "rxjs/operators";


export const browserPlatformCreator: GamePlatformCreator = (rules: GameRules) => (renderState: Observable<TargetState>) => {


  const element = document.querySelector(rules.container);



  element.innerHTML = `
    <svg style="width: 100%;height: 100%">
          <g id="target" transform="translate(0,0)"">
            <rect id="tergetRect" x="-100" y="-100" width="200" height="200" style="fill: chartreuse"></rect>
            <circle  r="100" cx="0" cy="0" style="fill:cornflowerblue"></circle>
            <circle r="20" cx="0" cy="0" style="fill:deepskyblue"></circle>
            <circle r="5" cx="0" cy="0" style="fill:cyan"></circle>
         </g>
    </svg>
  `;

  const target=document.querySelector("#target")
  const targetRect=document.querySelector("#targetRect")



  renderState.subscribe((renderState: TargetState) => {

    let [cx, cy] = [renderState.position.x, renderState.position.y]
    target.setAttribute("transform",`translate(${cx},${cy})`);
  })




  return fromEvent(target,"click").pipe(
    map((e:MouseEvent)=>{
      let rect = (<any>e.currentTarget).getBoundingClientRect();
      let x = e.clientX - rect.left-100; //x position within the element.
      let y = e.clientY - rect.top-100;  //y position within the element.

      return {
        clickDistance:Math.sqrt(x*x+y*y)
      }


    })

  )


}
