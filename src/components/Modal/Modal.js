import React from 'react';
import { ReactComponent as Close } from "imgs/x-mark.svg";
import { ModalInput } from 'components'
import {
  StyledModal,
  ModalContent,
  ModalHeaderParent,
  ModalHeaderContainer,
  ModalHeader,
  CloseButtonsContainer,
  StyledButtons,
  IconContainer,
  StyledIcon,
  ModalBody,
  StyledInstructions,
  StyledListItem,
  StyledList,
  StyledInputContainer,
  StyledParagraph
} from "./styles";


const CloseButtons = ({name, background, handleShowModal, width}) => (
    <StyledButtons width={width} name={name} background={background} onClick={handleShowModal}>{name}</StyledButtons>
)

const Modal = (props) => {
  if(!props.showModal){
      return null
  }
  return (
    <StyledModal show={props.showModal}>
      <ModalContent>
        <ModalHeaderContainer>
          <ModalHeader>
            Select Coins
            <StyledIcon onClick={props.handleShowModal}>
              <Close />
            </StyledIcon>
          </ModalHeader>
        </ModalHeaderContainer>
        <ModalBody>
          <div>
            <StyledInstructions>
              <StyledList>
                <StyledListItem>
                  Type coin name, then select from dropdown
                </StyledListItem>
                <StyledListItem>
                  {" "}
                  Type amount owned (default: 0)
                </StyledListItem>
                <StyledListItem>
                  Type date purchased (default: today)
                </StyledListItem>
              </StyledList>
            </StyledInstructions>
          </div>
          <StyledInputContainer>
            <ModalInput name="Coin Name..." type="text" />
            <ModalInput name="Amount Owned..." type="text" />
            <ModalInput
              name="date"
              type="date"
              value={new Date().toISOString().slice(0, 10)}
            />
          </StyledInputContainer>
        </ModalBody>
        <StyledParagraph>
          **If you submit a coin already in your inventory it will
          overwrite previous data.
        </StyledParagraph>
        <CloseButtonsContainer>
          <CloseButtons
            name="Close"
            handleShowModal={props.handleShowModal}
            background="white"
            width="150px"
          />
          <CloseButtons
            name="Save and Close"
            handleShowModal={props.handleShowModal}
            width="200px"
          />
        </CloseButtonsContainer>
      </ModalContent>
    </StyledModal>
  );
}


export default Modal;
