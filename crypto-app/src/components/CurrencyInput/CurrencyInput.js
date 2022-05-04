import React from 'react'
import { StyledInput } from './styles'

class CurrencyInput extends React.Component {
    state = {
        inputValue:"",
    }
    handleChange = (e) => {
        const {symbol} = this.props
        const split = symbol.split("")[0]
        if(e.target.value === symbol || this.state.inputValue.includes(split) || e.target.value === "") {
            this.setState({inputValue: e.target.value})
        } else {
          this.setState({inputValue: " " + symbol + " " + e.target.value});
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const value = this.state.inputValue
        this.props.handleSubmit(value);
    }
    render(){
         return(
            <form onSubmit={this.handleSubmit}>
                <StyledInput onKeyDown={(e) => this.props.handleKeyDown(e)} onChange={this.handleChange} value={this.props.exchange || this.state.inputValue} />
            </form>
        )
    }
}

export default CurrencyInput;
