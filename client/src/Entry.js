
import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

async function getEntries(){
  try {
    const url = 'http://127.0.0.1:5000/';
    const res = await fetch(url);
    return await res.json();
  } catch(err) {
    console.error({GET_ENTRIES_ERROR: err});
    return []
  }
}

function EntryHeader(props){
  return (
    <header className='entry-header'>
      <h3>{ props.entry.title }</h3>
      <div className='header-btns' style={{ display: props.active == props.index ? 'flex' : 'none' }}>
        <a className='header-btn' style={{ background: 'var(--teal)' }}>Add Image</a>
        <a className='header-btn' style={{ background: 'var(--forest)' }} onClick={ e => props.onClick(props.index) }>Save</a>
        <a className='header-btn' style={{ background: 'var(--red)' }}>Cancel</a>
      </div>
    </header>
  )

}

function SwitchComponent(props){
  function updateByline(val){
    props.onChangeByline(val);
  }
  function updateBody(val){
    props.onChangeBody(val);
  }
  return props.active != props.index
    ? <>
        <h5>{ props.entries[props.index].bylineContent }</h5>
        <p>{ props.entries[props.index].bodyContent }</p>
      </>
    : (
        <>
          <textarea onKeyPress={ e => updateBody(e.target.value) }/>
          <div className="byline">
            <h5 key={ `${props.byline}h5` }>{ props.byline }</h5>
            <input key={ props.byline } onChange={ e => updateByline(e.target.value) }/>
          </div>
        </>
      )
}

export default function Entry(){
  const [activeEntry, setActiveEntry] = useState(-1);
  const [body, setBody] = useState('');
  const [byline, setByline] = useState('');
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const loadData = async() => {
      let data = await getEntries();
      data = ['quote', 'joke', 'fact', 'tech_skill', 'non_tech_skill', 'idea', 'notes'].reduce((a, i) => {
        a.push(data.find(d => d.short == i));
        return a;
      }, []);

      setEntries(data);
    };
    loadData();
  }, [])
  function setContextEntry(index){
    const IndexContext = React.createContext(index);
    setActiveEntry(index);
  }
  async function postUpdatedEntry(index){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          subtitle: byline,
          img: '',
          body: body
        }
      )
    };
    // console.log(reqOptions);
    // try {
    fetch(`http://127.0.0.1:5000/update_entry/${entries[index].short}`, reqOptions)
        .then(res => res.json())
        .then(data => {
          let fncEntries = entries
          console.log({BODY: data.body, SUBTITLE: data.subtitle});
          fncEntries[index].bodyContent = data.body;
          fncEntries[index].bylineContent = data.subtitle;
          setEntries(fncEntries);
          setActiveEntry(-1)
        })
  }
  return (
    entries.map((e, x) => {
      console.log(e);
      return <div className="one-off entry" key={ e.short } onClick={ () => setContextEntry(x) }>
        <EntryHeader entry={ e } active={ activeEntry } index={ x } onClick={ postUpdatedEntry }/>
        <SwitchComponent entries={ entries } active={ activeEntry } index={ x } byline={ e.byline } onChangeBody={ setBody } onChangeByline={ setByline } body={ body } bylineVal={ byline }/>
      </div>
    }

    )
  );
}
