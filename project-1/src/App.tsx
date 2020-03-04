import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';

class App extends Component {

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Form</h2>
          <Form onSubmit={fields =>}>

          </Form>
      </div>
    </div>
  );
}

export default App;
