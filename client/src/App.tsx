import { Outlet } from "react-router";
import { StyledMain } from "./App.styles";

function App() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default App;
