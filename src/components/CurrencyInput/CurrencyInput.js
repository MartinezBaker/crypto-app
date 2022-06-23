import React, { useState } from 'react'
import { connect } from 'react-redux'
import { converterSubmit } from 'store/CoinPage/actions'
import { StyledInput } from './styles'

const CurrencyInput = (props) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const {symbol, exchange} = props
  return (
    <form onSubmit={(e) => { e.preventDefault(); setValue(""); props.converterSubmit(value, symbol);}}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    converterSubmit: (value, symbol) => dispatch(converterSubmit(value, symbol)),
  };
}

export default connect(null, mapDispatchToProps)(CurrencyInput);