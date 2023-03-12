import React, { useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const ratesRef = React.useRef({});
  const [fromCurrency, setFromCurrency] = React.useState('BYN');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromChangeValue, setFromChangeValue] = React.useState(0);
  const [toChangeValue, setToChangeValue] = React.useState(1);

  const onChangeFromCurrency = (value) => {
    const inputToCurrency =
      (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];

    setFromChangeValue(value);
    setToChangeValue((+inputToCurrency).toFixed(2));
  };

  const onChangeToCurrency = (value) => {
    const inputFromCurrency =
      (value / ratesRef.current[toCurrency]) * ratesRef.current[fromCurrency];

    setToChangeValue(value);
    setFromChangeValue((+inputFromCurrency).toFixed(2));
  };

  useEffect(() => {
    onChangeFromCurrency(fromChangeValue);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToCurrency(toChangeValue);
  }, [toCurrency]);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((data) => {
        ratesRef.current = data.rates;
        onChangeToCurrency(toChangeValue);
      })
      .catch((err) => {
        alert(err);
        throw new Error(err);
      });
  }, []);

  console.log('render');

  return (
    <div className="App">
      <Block
        value={fromChangeValue}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromCurrency}
      />
      <Block
        value={toChangeValue}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToCurrency}
      />
    </div>
  );
}

export default App;
