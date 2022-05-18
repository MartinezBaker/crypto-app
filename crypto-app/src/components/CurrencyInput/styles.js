import styled from "styled-components";

export const StyledInput = styled.input`
    height: 32px;
    width: 210px;
    border: none;
    border-radius: 0px 8px 8px 0px;
    background-color:${({darkMode}) => {
        if(darkMode){
            return "rgb(44, 47, 54)";
        }else {
            return "white"
        }
    }};
    color:${({darkMode}) => {
        if(darkMode){
            return "white"
        }else{
            return "black"
        }
    }};
    &:focus {
        outline: none;
    }
`;

