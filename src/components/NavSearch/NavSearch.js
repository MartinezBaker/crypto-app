import React, { useState } from "react";
import { connect } from "react-redux";
import { ReactComponent as Search } from "imgs/search.svg";
import { navSearchBar, saveCoinId } from "store/Main/actions";
import { StyledInput, StyledForm, StyledIconContainer, StyledIcon } from './styles'

const NavSearch = (props) => {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value)
    props.navSearchBar(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = props.main.searchArry.filter((coin) => coin.name.toLowerCase() === input.toLowerCase()).map((coin) => coin.id).reduce((c) => c)
    props.saveCoinId(id)
   setInput("")
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledIconContainer>
        <StyledIcon>
          <Search />
        </StyledIcon>
      </StyledIconContainer>
      <StyledInput
        type="text"
        value={input}
        placeholder="Search..."
        onChange={handleChange}
        list="coins"
      />
      {input?.length >= 1 && input?.length < 4 ? (
        <datalist id="coins">
          {props.main.searchArry?.map((coin) => (
            <option key={coin.name} value={coin.name} />
          ))}
        </datalist>
      ) : null}
    </StyledForm>
  );
};

const mapStateToProps = (state) => ({
    main: state.main
})

const mapDispatchToProps = (dispatch) => {
    return{
        navSearchBar: (value) => dispatch(navSearchBar(value)),
        saveCoinId: (id) => dispatch(saveCoinId(id))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);