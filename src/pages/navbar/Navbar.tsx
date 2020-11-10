import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Logo from "../../assests/images/trello-mark-blue.png";
import { NavbarWrapper, BrandWrapper } from "./Navbar.styles";
import { SketchPicker } from "react-color";

type GlobalProps = {
  background: string;
};

export const GlobalStyle = createGlobalStyle<GlobalProps>`
  body {
    background-color: ${(props) => props.background}
  }
`;



const Navbar = () => {
  const [background, setBackground] = useState<string>("#0079bf");
  const handleChangeComplete = (color: any) => {
    setBackground(color.hex);
  };
  return (
    <NavbarWrapper>
      <nav className="navbar navbar-light">
        <BrandWrapper>
          <img src={Logo} alt="" />
          <h5>Trello</h5>

          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Color
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <div className="dropdown-item">
                <SketchPicker
                  color={background}
                  onChangeComplete={handleChangeComplete}
                />
              </div>
            </div>
          </div>
        </BrandWrapper>
      </nav>
      <GlobalStyle background={background} />
    </NavbarWrapper>
  );
};

export default Navbar;
