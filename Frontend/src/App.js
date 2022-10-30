import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App" id="root">
      <WelcomePage/>
      <hr/>
      <EntryPage/>
      <hr/>
      <ResultsPage/>
      <hr/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
      <header className="Welcome-header">
        <h1>
          Welcome to Pet Health!
        </h1>
        <p onClick={this.entryClick}>
          Get Started!
        </p>
      </header>
    );
  }
}

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciesNames: [], 
      breedNames: []
    };
  }

  componentDidMount() {
    this.SpeciesList();
}

  SpeciesList() {
    document.getElementById("SpeciesTable").style.display = "flex";
    const fetchPromise = fetch("http://localhost:8081/api/SpeciesNames");
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then((data) => this.setState({speciesNames: data}));
  };

  // Species should be a state stored variable
  BreedList(species) {
    document.getElementById("BreedsTable").style.display = "flex";
    const fetchPromise = fetch(`http://localhost:8081/api/BreedNames?species=${species}`);
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then((data) => this.setState({breedNames: data}));
  };

  // Requires species and breed to be available to it (Use state)
  EntryForm() {

  }

  render() {
    // Populate the species input with available species
    const species = this.state.speciesNames.map(item => (
      <td className="Entry-table-form">
        <button onClick={() => {this.BreedList(item);}}>
          {item}
        </button>
      </td>
    ));
    // Populate the breeds input with the selected species
    const breeds = this.state.breedNames.map(item => (
      <td className="Entry-table-form">
        <button>
          {item}
        </button>
      </td>
    ));
      // TO-DO: The sub tables can be reduced to react components
    return (
      <div className="Welcome-header">
        <header>
          Please enter in your pets information below!
        </header>
        <div>
          <table className="Entry-table" id="SpeciesTable">
            <caption>Species</caption>
            <tbody>
              <tr>{species}</tr>
            </tbody>
          </table>
          <table className="Entry-table" id="BreedsTable">
            <caption>Breeds</caption>
            <tbody>
              <tr>{breeds}</tr>
            </tbody>
          </table>
          <table className="Entry-table">
            <caption>Weight</caption>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
          <table className="Entry-table">
            <caption>Age</caption>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
      
    );
  }
}

class ResultsPage extends React.Component {
  render() {
    return (
      <header className="Welcome-header">
        <p>Results</p>
      </header>
    );
  }
}

export default App;
