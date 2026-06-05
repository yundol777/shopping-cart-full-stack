import { useLocation } from "react-router";
import checkIcon from "../../assets/check.svg";
import { Container, HomeButton, NavigationIcon } from "./Header.styles";

const getHeaderImage = (pathname: string) => {
  if (pathname === "/checkout") return checkIcon;

  return "/favicon.svg";
};

const Header = () => {
  const { pathname } = useLocation();
  const isCheckout = pathname === "/checkout";

  return (
    <Container>
      <HomeButton to="/" isCheckout={isCheckout}>
        <NavigationIcon src={getHeaderImage(pathname)} alt="" />
      </HomeButton>
    </Container>
  );
};

export default Header;
