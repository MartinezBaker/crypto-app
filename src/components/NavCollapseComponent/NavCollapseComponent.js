import React from 'react';
import { connect } from 'react-redux';
import { openNav, darkModeClick } from 'store/Main/actions';
import { NavSearch } from 'components';
import { ReactComponent as Nav } from "imgs/nav.svg";
import DropDownMenu from '../CurrencyMenu/index'
import { StyledCollapsedNav, StyledNavChild, StyledCollapsedNavLink, StyledCollapsedThemeButton, StyledSideBar, StyledNavButton, NavSVGContainer, StyledHR } from 'styles';

const NavCollapseComponent = (props) => {
    const handleClick = () => {
      props.openNav();
      props.darkModeClick();
    };
    return (
      <StyledCollapsedNav>
        <StyledNavChild>
          <NavSearch />
          <DropDownMenu symbol={props.main.symbol} />
        </StyledNavChild>
        {props.main.isOpen && (
          <StyledSideBar>
            <StyledCollapsedNavLink to="/coins">Coins</StyledCollapsedNavLink>
            <StyledCollapsedNavLink to="/portfolio">
              Portfolio
            </StyledCollapsedNavLink>
            <StyledHR />
            <StyledCollapsedThemeButton onClick={handleClick}>
              Theme
            </StyledCollapsedThemeButton>
          </StyledSideBar>
        )}
        <div>
          <StyledNavButton onClick={props.openNav}>
            <NavSVGContainer>
              <Nav />
            </NavSVGContainer>
          </StyledNavButton>
        </div>
      </StyledCollapsedNav>
    );
}

const mapStateToProps = (state) => ({
    main: state.main
})

const mapDispatchToProps = (dispatch) => {
    return {
      openNav: () => dispatch(openNav()),
      darkModeClick: () => dispatch(darkModeClick())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavCollapseComponent)