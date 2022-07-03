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
      <datalist id="coinList">
        {props.limitedList.map((coin) => <option key={coin.name} value={coin.name} />)}
      </datalist> 
    </>
  )
};

const ModalInput = (props) => {
  const [value, setValue] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value)
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