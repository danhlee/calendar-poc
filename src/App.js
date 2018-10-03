import React, { Component } from 'react';
import './App.css';
import CustomCalendar from './components/CustomCalendar.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>CALENDAR</h1>
        <CustomCalendar first='10/15/2018' last='11/16/2018' />
      </div>
    );
  }
}

export default App;
