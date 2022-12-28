import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App" id="root">
      <WelcomePage />
      <hr />
      <EntryPage />
      <hr />
      <ResultsPage />
      <hr />
    </div>
  );
}

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.entryClick = this.entryClick.bind(this);
  }
  entryClick() { alert("entryPage"); }

  render() {
    return (
      <div className="Welcome-page">
        <header className="Welcome-header">
          <h1>
            Welcome to Pet Health!
          </h1>
          <p>
            Care for all!
          </p>
        </header>
        <p className="Welcome-clickable" onClick={this.entryClick}>
          Get Started!
        </p>
      </div>
    )
  }
}

// Root component of the submission page users interact with
function EntryPage() {
  // State of the arrays provided by the database
  const [databaseInfo, setDatabaseInfo] = useState({
    speciesNames: [],
    breedNames: []
  });
  // State of the gathered information from the users pet
  const [animalInfo, setAnimalInfo] = useState({
    species: "",
    breed: "",
    illnesses: [],
    facts: [],
  });

  // Runs the initialising call for species once
  useEffect(() => { SpeciesList(); }, []);

  // Updates the state to all of the names of animal species in the database
  const SpeciesList = () => {
    const fetchPromise = fetch("http://localhost:8081/api/SpeciesNames");
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => setDatabaseInfo(prevState => ({
      ...prevState,
      speciesNames: data
    })));
  };
  // Updates the state to all of the names of animals of a specific species in the database
  const BreedList = (species) => {
    setAnimalInfo(prevState => ({ ...prevState, species: species }));
    const fetchPromise = fetch(`http://localhost:8081/api/BreedNames?species=${species}`);
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => setDatabaseInfo(prevState => ({
      ...prevState,
      breedNames: data
    })));
  };
  // Updates the state AnimalInfo with the databases information on the specific breed
  const BreedInfo = (breed) => {
    setAnimalInfo(prevState => ({ ...prevState, breed: breed }));
    const fetchPromise = fetch(`http://localhost:8081/api/BreedInfo?species=${animalInfo.species}&breed=${breed}`);
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => setAnimalInfo(prevState => ({
      ...prevState,
      illnesses: data.illnesses,
      facts: data.facts
    })));
  }

  // TO-DO: Maps the given data to entries for a tables row
  const tableMapper = (data, func) => {
    //alert(BreedList())
    data.map(item => (
      <td className="Entry-table-form">
        <button onClick={() => { func(item); }}>
          {item}
        </button>
      </td>
    ));
  }
  // Populate the species input with available species
  const species = databaseInfo.speciesNames.map(item => (
    <td className="Entry-table-form">
      <button onClick={() => { BreedList(item); }}>
        {item}
      </button>
    </td>
  ));
  // Populate the breeds input with the selected species
  const breeds = databaseInfo.breedNames.map(item => (
    <td className="Entry-table-form">
      <button onClick={() => { BreedInfo(item); }}>
        {item}
      </button>
    </td>
  ));
  const info1 = <td>{animalInfo.illnesses}</td>;
  const info2 = <td>{animalInfo.facts}</td>;
  return (
    <div className="Welcome-header">
      <header>
        Please enter in your pets information below!
      </header>
      <div>
        <EntryTable title={"Species"} func={species} />
        {/* <EntryTable title={"Species"} func={species}/> */}
        <EntryTable title={"Breeds"} func={breeds} />
        <EntryTable title={"Weight"} func={info1} />
        <EntryTable title={"Age"} func={info2} />
      </div>
    </div>
  );
}

class EntryTable extends React.Component {
  constructor(props) { super(props); }
  render() {
    return (
      <table className="Entry-table" id="SpeciesTable">
        <caption>{this.props.title}</caption>
        <tbody>
          <tr>{this.props.func}</tr>
        </tbody>
      </table>
    );
  }
}

// Root component of the results from users submissions
function ResultsPage() {
  return (
    <div className="Welcome-header">
      <header>
        Results!
      </header>
      <body>
        <table>
          <tbody>
            <tr>
              <td>
                <ImageComponent />
              </td>
              <td>
                <ResultsComponent />
              </td>
            </tr>
            <tr>
              <TextComponent />
            </tr>
          </tbody>
        </table>
      </body>
    </div>
  );
}
// Image component
function ImageComponent() {
  return (
    <div>
      <p>
        Image
      </p>
    </div>
  );
}
// Results section component
function ResultsComponent() {
  return (
    <div>
      <TextComponent />
      <TextComponent />
    </div>
  );
}
// Text component
function TextComponent() {
  return (
    <div>
      <p>
        Text
      </p>
    </div>
  );
}

export default App;
