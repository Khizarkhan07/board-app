import styled from "styled-components";

export const NavbarWrapper = styled.div`
  background: #0067a3;
`;

export const BrandWrapper = styled.div`
  width: 100%;
  display: flex;
  img {
    margin-top: 4px;
    margin-left: 44%;
    width: 30px;
    height: 30px;
  }
  h5 {
    margin-top: 4px;
    font-size: 25px;
    color: #cce1ed;
    font-family: "Lobster", cursive;
  }
  .dropdown {
    float: right;
    margin-left: 5px;
  }
`;
