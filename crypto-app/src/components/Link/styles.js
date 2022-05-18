import styled from "styled-components";

export const LinkAnchor = styled.a`
    text-decoration: none;
    color:${({darkMode}) => {
      if(darkMode){
        return "white"
      }else {
        return "black"
      }
    }}
`

export const WebSiteSpan = styled.span`
  margin: 0px 6px 0px 6px;
`;