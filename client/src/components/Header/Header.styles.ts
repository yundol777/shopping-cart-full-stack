import styled from "@emotion/styled";
import { Link } from "react-router";

export const Container = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  background: #000000;
`;

export const HomeButton = styled(Link)<{ isCheckout: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
