import React from "react";
import { connect } from 'react-redux'
import { NavSearch } from 'components';
import DropDownMenu from "../CurrencyMenu/index";
import { ReactComponent as DarkMode } from "imgs/contrast-dark.svg";
import { darkModeClick } from "store/Main/actions";
import { StyledNav, StyledNavChild, StyledLink, StyledLinkContainer, StyledButton, SVGContainer } from 'styles'

const NavComponent = (props) => {
    return(
        <StyledNav>
            <StyledNavChild>
              <StyledLinkContainer
                active={props.main.path === "/coins" ? true : null}
              >
                <StyledLink
                  to="/coins"
                >
                  Coins
                </StyledLink>{" "}
                {""}
              </StyledLinkContainer>
              <StyledLinkContainer
                active={props.main.path === "/portfolio" ? true : null}
              >
                <StyledLink
                  to="/portfolio"
                >
                  Portfolio
                </StyledLink>
              </StyledLinkContainer>
            </StyledNavChild>
            <StyledNavChild>
              <NavSearch />
              <DropDownMenu symbol={props.main.symbol} />
              <StyledButton onClick={props.darkModeClick}>
                <SVGContainer>
                  <DarkMode />
                </SVGContainer>
              </StyledButton>
            </StyledNavChild>
        </StyledNav>
    )
}

const mapStateToProps = (state) => ({
    main: state.main
})

const mapDispatchToProps = (dispatch) => {
    return{
        darkModeClick: () => dispatch(darkModeClick())
    }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);