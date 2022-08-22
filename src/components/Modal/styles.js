import styled from 'styled-components';

export const StyledModal = styled.div`
  z-index: 1;
  display: ${({show}) => show ? "flex" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`; 

export const ModalContent = styled.div`
  @media (min-width: 600px) {
    width: 670px;
  };
  @media (max-width: 500px) {
    width: 90%;
  };
  border-radius: 23px;
  background-color: ${({ theme }) => theme.app};
  padding: 5px;
  margin-top: 100px;
`;

export const ModalHeaderParent = styled.div`
  width: 100%;
  display: flex;
`;

export const ModalHeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
`

export const ModalHeader = styled.div`
  color: ${({theme}) => theme.text};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
`

export const StyledIcon = styled.button`
  color: rgb(0, 252, 42);
  background: none;
  border: none;
  position: absolute;
  right: 4%;
  padding-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
`

export const ImgOutterContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 15px;
`;

export const ImgInnerContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.app};
  width: 50px;
  display: inline-block;
`;

export const StyledImg = styled.img`
  width: 100%;
`

export const CoinNameParent = styled.div`
  width: 100%;
  font-size: 12px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const StyledInstructions = styled.div`
  width: 143px;
  height: 155px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 10px;
  border-radius: 24px;
  padding: 15px 7px;
  margin: 0 0 10px 15px;
`;

export const InputFlex = styled.div`
  display: flex;
`

export const StyledInputContainer = styled.div`
  width: 65%;
  @media (max-width: 500px) {
    width: 75%;
  };
`;

export const StyledList = styled.ol`
  padding-left: 20px;
`

export const StyledListItem = styled.li`
  margin-bottom: 20px;
`

export const StyledForm = styled.form`
  width: 100%;
`;

export const StyledParagraph = styled.p`
  color:${({theme}) => theme.text};
  font-size: 12px;
  text-align: center;
`

export const CloseButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 5px;
`

export const StyledButtons = styled.button`
  margin: 4px;
  border: none;
  border-radius: 10px;
  padding: 15px;
  @media (max-width: 500px){
    width: 200px;
  };
  width: ${({width}) => width};
  font-weight: bold;
  color: ${({name, theme}) => {
    if(name === "Close") {
      return theme.modalButtonMain;
    }else{
      return theme.modalButtonSecondary;
    }
  }};
  background-color: ${({name}) => {
    if(name === "Close") {
      return "rgb(255, 255, 255)";
    }else{
      return "rgb(0, 252, 42)";
    }
  }};
  &:hover{
    cursor: pointer;
  }
`