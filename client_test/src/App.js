import React, { Component } from 'react';


import './App.css';
import Formulaire from './Formulaire';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

render() {
    return (
      <div className="App">
        <Formulaire/>
      </div>
    );
  }
}

export default App;