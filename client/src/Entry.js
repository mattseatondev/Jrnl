
export default function Entry(){
  const entries = [ 'Quote', 'Joke', 'Fact', 'Tech Skill', 'Non-Tech Skill', 'Idea', 'Notes' ];
  return (
    entries.map(e => 
      <div className="entry" key={ e }>
        <h3>{ e }</h3>
      </div>
    )
  );
}
