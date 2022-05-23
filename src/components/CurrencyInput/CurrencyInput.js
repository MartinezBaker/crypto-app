import React from 'react'
import { StyledInput } from './styles'

class CurrencyInput extends React.Component {
  state = {
      inputValue:"",
  }
  handleChange = (e) => {
      this.setState({inputValue:e.target.value})
  }
  handleSubmit = (e) => {
      e.preventDefault();
      const value = this.state.inputValue
      this.props.handleSubmit(value);
      this.setState({inputValue:""})
  }
  render(){
    const {inputValue} = this.state
    const {symbol, exchange} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledInput
          darkMode={this.props.darkMode}
          onChange={this.handleChange}
          value={
            inputValue.includes(symbol?.split('')[0])
              ? `${inputValue || exchange}`
              : `${symbol} ${
                  inputValue || exchange
                }`
          }
        />
      </form>
    );
  }
}

export default CurrencyInput;