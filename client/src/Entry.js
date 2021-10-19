
import { useState, useEffect, useReducer } from 'react';

function SwitchComponent(props){
  function updatePressed(event){
    if (event.key == 'Enter') {
      console.log('Pressed Enter Key');
    } else if (event.key == 'Enter' && event.shiftKey) {
      console.log('Enter Plus Shift');
    } else {
      console.log('Invalid Entry');
    }
  }
  return props.active != props.index
    ? <p>Content</p>
    : <textarea onKeyPress={ updatePressed }/>
}

export default function Entry(){
  const [activeEntry, setActiveEntry] = useState(-1);
  const entries = [ 'Quote', 'Joke', 'Fact', 'Tech Skill', 'Non-Tech Skill', 'Idea', 'Notes' ];
  return (
    entries.map((e, x) =>
      <div className="one-off entry" key={ e } onClick={ () => setActiveEntry(x) }>
        <h3>{ e }</h3>
        <SwitchComponent active={ activeEntry } index={ x }/>
      </div>
    )
  );
}
