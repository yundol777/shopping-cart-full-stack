import styled from "@emotion/styled";

export const Container = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 64px;
  border: 0;
  background: #000000;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    background: #bebebe;
    cursor: not-allowed;
  }
`;
