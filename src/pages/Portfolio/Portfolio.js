import React, { useState } from "react";
import { connect } from "react-redux/es/exports";
import { Modal }  from 'components'
import {StyledButton, ButtonContainer, ParentDiv,  } from './styles'

const Portfolio = (props) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(!showModal)
  }
  return (
    <ParentDiv>
      <ButtonContainer>
        <StyledButton onClick={handleShowModal}>
          <h2>Add Asset</h2>
        </StyledButton>
      </ButtonContainer>
      <Modal
        handleShowModal={handleShowModal}
        showModal={showModal}
      />
    </ParentDiv>
  );
}

 const mapStateToProps = (state) => ({
   portfolio: state.portfolio,
 });

 export default connect(mapStateToProps)(Portfolio);