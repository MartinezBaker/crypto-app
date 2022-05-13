import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { StyledButton } from './styles';

const CopyTextButton = ({link, handleCopyClick}) => (
  <StyledButton onClick={() => handleCopyClick(link)}>
    <FontAwesomeIcon icon={faClone} />
  </StyledButton>
);

export default CopyTextButton;