import styled from "styled-components";

const Separator = styled.hr`
  margin: 0;
  padding: 0;
  border: 0;
  width: 120px;
  height: 1px;
  border-top: 1px solid rgb(158, 155, 155);
`;

function NavSeparator() {
  return <Separator role="presentation" />;
}

export default NavSeparator;
