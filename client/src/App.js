
import './App.css';
import Header from './Header';
import OneOffs from './OneOffs';
import Entry from './Entry'

function App() {
  return (
    <>
      <Header/>
      <main className="inner-container">
        <OneOffs/>
        <Entry/>
      </main>
    </>
  );
}

export default App;
