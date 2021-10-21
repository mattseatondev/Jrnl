
import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

const entries = [
  {
    title: 'Quote',
    byline: 'Source',
    short: 'quote',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Joke',
    byline: 'Source',
    short: 'joke',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Fact',
    byline: 'Subject',
    short: 'fact',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Tech Skill',
    byline: 'Stack',
    short: 'tech_skill',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Non-Tech Skill',
    byline: 'Category',
    short: 'non_tech_skill',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Idea',
    byline: 'Requirements',
    short: 'idea',
    bylineContent: '',
    bodyContent: ''
  },
  {
    title: 'Notes',
    byline: 'Post Script',
    short: 'notes',
    bylineContent: '',
    bodyContent: ''
  }];

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
        <h5>{ entries[props.index].bylineContent }</h5>
        <p>{ entries[props.index].bodyContent }</p>
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
          entries[index].bodyContent = data.body;
          entries[index].bylineContent = data.subtitle
          setActiveEntry(-1)
        })
  }
  return (
    entries.map((e, x) =>
      <div className="one-off entry" key={ e.short } onClick={ () => setContextEntry(x) }>
        <EntryHeader entry={ e } active={ activeEntry } index={ x } onClick={ postUpdatedEntry }/>
        <SwitchComponent active={ activeEntry } index={ x } byline={ e.byline } onChangeBody={ setBody } onChangeByline={ setByline } body={ body } bylineVal={ byline }/>
      </div>
    )
  );
}
