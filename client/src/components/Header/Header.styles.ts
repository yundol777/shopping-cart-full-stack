import styled from "@emotion/styled";
import { Link } from "react-router";

export const Container = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
`;

export const HomeButton = styled(Link)<{ isCheckout: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ isCheckout }) => (isCheckout ? "#000000" : "transparent")};
`;

export const NavigationIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;
