import styled from "styled-components";
import bg from './img/bg.jpg';
import {MainLayout} from "./styles/layout";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";

function App() {

  return (
    <AppStyled bg={bg} className="App">
      <Orb />
      <MainLayout>
        <Navigation />
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: url(${props => props.bg}) no-repeat center center fixed;
  position: relative;
`;

export default App;
