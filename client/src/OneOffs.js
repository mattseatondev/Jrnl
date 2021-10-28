
import { useState, useEffect, useReducer } from 'react';

function SwitchComponent(props){
  return props.active != props.index
    ? <p>{ props.content }</p>
    : <input/>
}

export default function OneOffs(){
  const [active, setActive] = useState(-1);
  const cats = [ 'Vocab', 'Artist', 'Song', 'Code Challenge', 'Duo', 'Recipe', 'AM Workout', 'PM Workout', 'Read 30min', 'Game' ]
  const shorts = ['vocab', 'artist', 'song', 'code', 'duo', 'recipe', 'am', 'pm', 'read', 'game']
  const [content, setContent] = useState(shorts)
  async function updateOneoff(e){
    if (e.key == 'Enter' && e.target.value.length) {
      const body = {val: e.target.value};
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };
      fetch(`http://127.0.0.1:5000/update_oneoff/${shorts[active]}`, reqOptions)
          .then(res => res.json)
          .then(data => {
            console.log(data);
            let dShorts = shorts;
            dShorts[active] = data;
            setContent(dShorts);
          })
          .catch(err => {
            console.error({ERROR: err});
          })
    } else {
      console.log('too short or wrong key')
    }
  }
  return (
    <div className="one-offs">
      { cats.map((c, x) =>
        <div key={ c } className="one-off" onClick={ () => setActive(x) } onKeyDown={ updateOneoff }>
          <h5>{ c }</h5>
          <SwitchComponent active={ active } index={ x } content={ content[x] ? content[x] : 'Content' }/>
        </div>
      ) }
    </div>
  )
}
