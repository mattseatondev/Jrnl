
import React, { useState} from 'react';

function Component(){
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems()
  }
  return(
    <div className="Component" props="props">
    <button className="button-class" onClick={ () => addItem }>Add Number</button>
      <ul>
        {items.map((i => <li key={ item.id }>{ item.value }</li>))}
      </ul>
    </div>
  )
}

export default Component;
