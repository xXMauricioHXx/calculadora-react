import React from 'react';
import './Calculator.css';
import { Button } from '../components/Button';
import { Display } from '../components/Display';

interface Props {}

interface State {
  displayValue: string,
  clearDisplay: boolean,
  operation: string | null,
  current: number;
  values: number[];
}

export class Calculator extends React.Component<Props, State> {
  protected readonly initialState: State;
  constructor(props: Props) {
    
    super(props);
    this.initialState = {
      displayValue: '0',
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0      
    };
    this.state = { ...this.initialState};
  }
  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue}/>
        <Button label='AC' triple click={() => this.clearMemory()}/>
        <Button label='/' operation click={this.setOperation.bind(this)}/>
        <Button label='7' click={this.addDigit.bind(this)}/>
        <Button label='8' click={this.addDigit.bind(this)}/>
        <Button label='9' click={this.addDigit.bind(this)}/>
        <Button label='*' operation click={this.setOperation.bind(this)}/>
        <Button label='4' click={this.addDigit.bind(this)}/>
        <Button label='5' click={this.addDigit.bind(this)}/>
        <Button label='6' click={this.addDigit.bind(this)}/>
        <Button label='-' operation click={this.setOperation.bind(this)}/>
        <Button label='1' click={this.addDigit.bind(this)}/>
        <Button label='2' click={this.addDigit.bind(this)}/>
        <Button label='3' click={this.addDigit.bind(this)}/>
        <Button label='+' operation click={this.setOperation.bind(this)}/>
        <Button label='0' double click={this.addDigit.bind(this)}/>
        <Button label='.' click={this.addDigit.bind(this)}/>
        <Button label='=' operation click={this.setOperation.bind(this)}/>
      </div>
    );
  }

  clearMemory() {
    this.setState({...this.initialState});
  }

  setOperation(operation: string) {
    if (this.state.current === 0) {
      this.setState({current: 1, operation, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      switch(currentOperation) {
        case '/': 
          values[0] = values[0] / values[1];
        break;
        case '+': 
          values[0] = values[0] + values[1];
        break;
        case '-': 
          values[0] = values[0] - values[1];
        break;
        case '*': 
          values[0] = values[0] * values[1];
        break;
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit(digit: string) {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({displayValue, clearDisplay: false});
    
    if (digit !== '.') {
      const i = this.state.current;
      const newValue =  parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({values});
    }
  }
}