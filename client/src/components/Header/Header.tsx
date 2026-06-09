import { useLocation } from "react-router";
import backArrow from "../../assets/back-arrow.png";
import appLogo from "../../assets/app-logo.png";
import { Container, HomeButton } from "./Header.styles";
import Button from "../../commons/Button/Button";

const getHeaderImage = (pathname: string) => {
  if (pathname === "/checkout") return backArrow;

  return appLogo;
};

const Header = () => {
  const { pathname } = useLocation();
  const isCheckout = pathname === "/checkout";

  return (
    <Container>
      <HomeButton to="/" isCheckout={isCheckout}>
        <img src={getHeaderImage(pathname)} alt="" />
      </HomeButton>
      <Button label="결제하기" onClick={() => {}} disabled={true} />
    </Container>
  );
};

export default Header;
