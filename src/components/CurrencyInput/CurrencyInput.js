import React, { useState } from 'react'
import { StyledInput } from './styles'

const CurrencyInput = (props) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(value);
    setValue("")
 }
  const {symbol, exchange} = props
  return (
    <form onSubmit={handleSubmit}>
      <StyledInput
        onChange={handleChange}
        value={
          value.includes(symbol?.split('')[0])
            ? `${value || exchange}`
            : `${symbol} ${
                value || exchange
              }`
        }
      />
    </form>
  );
}

export default CurrencyInput;