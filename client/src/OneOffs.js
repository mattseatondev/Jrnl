
export default function OneOffs(){
  const cats = [ 'Vocab', 'Artist', 'Song', 'Code Challenge', 'Duo', 'Recipe', 'AM Workout', 'PM Workout', 'Read 30min' ]
  return (
    <div className="one-offs">
      { cats.map(c =>
        <div key={ c } className="one-off">
          <h5>{ c }</h5>
        </div>
      ) }
    </div>
  )
}
