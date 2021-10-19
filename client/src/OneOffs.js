
import { useState, useEffect, useReducer } from 'react';

function SwitchComponent(props){
  return props.active != props.index
    ? <p>Content</p>
    : <input/>
}

export default function OneOffs(){
  const [active, setActive] = useState(-1);
  const cats = [ 'Vocab', 'Artist', 'Song', 'Code Challenge', 'Duo', 'Recipe', 'AM Workout', 'PM Workout', 'Read 30min', 'Game' ]
  return (
    <div className="one-offs">
      { cats.map((c, x) =>
        <div key={ c } className="one-off" onClick={ () => setActive(x) }>
          <h5>{ c }</h5>
          <SwitchComponent active={ active } index={ x }/>
        </div>
      ) }
    </div>
  )
}
