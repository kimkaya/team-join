import React from "react";
import styled from "styled-components";
import Nav from "./Nav";

const Item = styled.li`
  margin: 8px;
`;

function NavItem({ children, disabled = false }) {
  return <Item role={disabled ? "presentation" : null}>{children}</Item>;
}

export default NavItem;
