import React from 'react';
import useState from 'react-usestateref';
import { StyledInput, StyledNameInput } from './styles';

export const CurrencyNameInput = (props) => {
  const [value, setValue, valueRef] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    props.handleChange(valueRef.current, props.name);
  };
  return (
    <>
      <StyledNameInput
        onChange={handleChange}
        type={props.type}
        placeholder={props.name}
        value={value}
        list="coinList"
      />
      {value?.length < 4 ? <datalist id="coinList">
        {props.limitedList.map((coin) => <option key={coin.name} value={coin.name} />)}
      </datalist> : null}
    </>
  )
};

const ModalInput = (props) => {
  const [value, setValue] = useState("")
  const handleChange = (e) => {
    const symbol = props.symbol;
    props.name === "Amount Owned..." && !e.target.value.includes(symbol) ? setValue(symbol + " " + e.target.value) : setValue(e.target.value)
    props.handleChange(value, props.name)
  }
  
  return (
    <StyledInput
      onChange={handleChange}
      type={props.type}
      placeholder={props.name}
      value={value || props.value}
    />
  );
}

export default ModalInput;