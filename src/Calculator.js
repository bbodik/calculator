import React, { useState } from 'react';

// Компонент кнопки калькулятора
const CalculatorButton = ({ value, onClick, className }) => {
  return (
    <button
      className={`${className} p-4 text-xl font-bold rounded-lg transition-colors hover:bg-gray-200 active:bg-gray-300`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

// Головний компонент калькулятора
const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumberStarted, setNewNumberStarted] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || newNumberStarted) {
      setDisplay(num.toString());
      setNewNumberStarted(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumberStarted(true);
  };

  const handleEqual = () => {
    const secondNumber = parseFloat(display);
    let result;

    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '×':
        result = firstNumber * secondNumber;
        break;
      case '÷':
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumberStarted(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-xl shadow-lg">
      <div className="bg-white p-4 rounded-lg mb-4">
        <div className="text-right text-4xl font-bold overflow-hidden">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton value="C" onClick={handleClear} className="bg-red-200" />
        <CalculatorButton value="±" onClick={() => setDisplay((prev) => (parseFloat(prev) * -1).toString())} />
        <CalculatorButton value="%" onClick={() => setDisplay((prev) => (parseFloat(prev) / 100).toString())} />
        <CalculatorButton value="÷" onClick={() => handleOperation('÷')} className="bg-blue-200" />
        
        <CalculatorButton value="7" onClick={() => handleNumber(7)} />
        <CalculatorButton value="8" onClick={() => handleNumber(8)} />
        <CalculatorButton value="9" onClick={() => handleNumber(9)} />
        <CalculatorButton value="×" onClick={() => handleOperation('×')} className="bg-blue-200" />
        
        <CalculatorButton value="4" onClick={() => handleNumber(4)} />
        <CalculatorButton value="5" onClick={() => handleNumber(5)} />
        <CalculatorButton value="6" onClick={() => handleNumber(6)} />
        <CalculatorButton value="-" onClick={() => handleOperation('-')} className="bg-blue-200" />
        
        <CalculatorButton value="1" onClick={() => handleNumber(1)} />
        <CalculatorButton value="2" onClick={() => handleNumber(2)} />
        <CalculatorButton value="3" onClick={() => handleNumber(3)} />
        <CalculatorButton value="+" onClick={() => handleOperation('+')} className="bg-blue-200" />
        
        <CalculatorButton value="0" onClick={() => handleNumber(0)} className="col-span-2" />
        <CalculatorButton value="." onClick={() => handleNumber('.')} />
        <CalculatorButton value="=" onClick={handleEqual} className="bg-green-200" />
      </div>
    </div>
  );
};

export default Calculator;