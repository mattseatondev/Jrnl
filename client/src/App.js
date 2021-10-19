
import './App.css';
import Header from './Header';
import OneOffs from './OneOffs';
import Entry from './Entry';
import moment from 'moment';

function App() {
  const today = moment(Date.now());
  const dayOfWeek = today.format('dddd').toLowerCase().substring(0, 3);
  const todaysDate = today.format('dddd | MMMM D | yyyy');
  console.log(todaysDate);
  return (
    <>
      <Header date={ todaysDate }/>
      <main className="inner-container" style={{ color: `var(--${ dayOfWeek })`}}>
        <OneOffs/>
        <Entry/>
      </main>
    </>
  );
}

export default App;
