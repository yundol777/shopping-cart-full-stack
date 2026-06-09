import { Outlet } from "react-router";
import { ScrollArea, StyledMain } from "./App.styles";
import Header from "./components/Header/Header";

function App() {
  return (
    <StyledMain>
      <Header />
      <ScrollArea>
        <Outlet />
      </ScrollArea>
    </StyledMain>
  );
}

export default App;
