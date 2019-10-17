import React from 'react';
import './Button.css';

interface Props {
  label: string;
  operation?: boolean;
  double?: boolean;
  triple?: boolean;
  click? : Function;
}

export class Button extends React.Component<Props> {
  render() {
    return (      
      <button className={this.setClass()} onClick={() => this.props.click && this.props.click(this.props.label)}>        
        {this.props.label}
      </button>
    );
  }  

  setClass(): string {    
    return `button ${this.props.operation ? 'operation' : ''} ${this.props.double ? 'double' : ''} ${this.props.triple ? 'triple' : ''} `;
  }
}