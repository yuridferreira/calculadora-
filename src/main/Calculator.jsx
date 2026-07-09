import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState(initialState);
    }

    calculate(a, b, operation) {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b === 0 ? 'Error' : a / b;
            default:
                return b;
        }
    }

    setOperation(operation) {
        if (operation === '=') {
            if (this.state.operation === null || this.state.clearDisplay) {
                return;
            }

            const values = [...this.state.values];
            const result = this.calculate(
                values[0],
                parseFloat(this.state.displayValue),
                this.state.operation
            );

            this.setState({
                displayValue: String(result),
                values: [result, 0],
                clearDisplay: true,
                operation: null
            });
            return;
        }

        if (this.state.operation && !this.state.clearDisplay) {
            const values = [...this.state.values];
            const result = this.calculate(
                values[0],
                parseFloat(this.state.displayValue),
                this.state.operation
            );

            this.setState({
                displayValue: String(result),
                values: [result, 0],
                operation,
                clearDisplay: true
            });
            return;
        }

        const values = [...this.state.values];
        values[0] = parseFloat(this.state.displayValue);

        this.setState({
            values,
            operation,
            clearDisplay: true
        });
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return;
        }

        if (this.state.clearDisplay) {
            this.setState({
                displayValue: n === '.' ? '0.' : n,
                clearDisplay: false
            });
            return;
        }

        const displayValue = this.state.displayValue === '0' && n !== '.'
            ? n
            : `${this.state.displayValue}${n}`;

        this.setState({ displayValue });
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        );
    }
}