import React, { useState } from 'react';
import { StyledInput, StyledForm} from './styles';

const ModalInput = (props) => {
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Not Finished")
    }
    return (
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          onChange={handleChange}
          type={props.type}
          placeholder={props.name}
          value={value || props.value}
        />
      </StyledForm>
    );
}

export default ModalInput;