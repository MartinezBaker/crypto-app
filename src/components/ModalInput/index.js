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
        required
      />
      {value?.length >= 1 && value?.length < 4 ? <datalist id="coinList">
        {props.searchList?.map((coin) => <option key={coin.name} value={coin.name} />)}
      </datalist> : null}
    </>
  )
};

export const AmountInput = (props) => {
  const [value, setValue, valueRef] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    props.handleChange(valueRef.current, props.name);
  };
  return (
    <StyledInput
      onChange={handleChange}
      type={props.type}
      placeholder={props.name}
      value={value}
      required
    />
  );
}

export const DateInput = (props) => {
  const [value, setValue, valueRef] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value)
    props.handleChange(valueRef.current, props.name)
  }
  return (
    <StyledInput
      onChange={handleChange}
      type={props.type}
      max={props.max}
      value={value ? value : props.value}
      required
    />
  );
}