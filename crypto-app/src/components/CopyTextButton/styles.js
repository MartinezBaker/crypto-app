import styled from 'styled-components'

export const StyledButton = styled.button`
    border: none;
    background-color: inherit;
    cursor: pointer;
    color:${({darkMode}) => {
        if(darkMode){
            return "white"
        }else {
            return "black"
        }
    }};
`