import React  from "react";
import { createGlobalStyle } from "styled-components";
import Logo from "../../assests/images/trello-mark-blue.png";
import { NavbarWrapper, BrandWrapper } from "./Navbar.styles";
type GlobalProps = {
  background: string;
};

export const GlobalStyle = createGlobalStyle<GlobalProps>`
  body {
    background-color: ${(props) => props.background}
  }
`;



const Navbar = () => {

  return (
    <NavbarWrapper>
      <nav className="navbar navbar-light">
        <BrandWrapper>
          <img src={Logo} alt="" />
          <h5>Trello</h5>
        </BrandWrapper>
      </nav>
      <GlobalStyle background={"#0079bf"} />
    </NavbarWrapper>
  );
};

export default Navbar;
