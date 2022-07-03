import React from "react";
import { connect } from "react-redux";
import { showModal } from "store/Portfolio/actions";
import { Modal }  from 'components'
import {StyledButton, ButtonContainer, ParentDiv,  } from './styles'

const Portfolio = (props) => {
  return (
    <ParentDiv>
      <ButtonContainer>
        <StyledButton onClick={() => props.showModal()}>
          <h2>Add Asset</h2>
        </StyledButton>
      </ButtonContainer>
      <Modal/>
    </ParentDiv>
  );
}

 const mapStateToProps = (state) => ({
   portfolio: state.portfolio,
 });

 const mapDispatchToProps = (dispatch) => {
  return{
    showModal: () => dispatch(showModal())
  }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);