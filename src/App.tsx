import React from 'react';
import { Calculator } from './main/Calculator';
import './App.css';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Calculadora</h1>
        <div className="container">
          <Calculator />
        </div>
      </div>          
    );
  }
}
