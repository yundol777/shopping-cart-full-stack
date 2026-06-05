import styled from "@emotion/styled";

export const Container = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 52px;
  border: 0;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #bebebe;
    cursor: not-allowed;
  }
`;
