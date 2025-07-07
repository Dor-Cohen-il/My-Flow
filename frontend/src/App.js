import styled from "styled-components";
import bg from './img/bg.jpg';
import {MainLayout} from "./styles/layout";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import { useMemo, useState } from "react";
import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Incomes from "./components/Incomes/Incomes";
import Expenses from "./components/Expenses/Expenses";

function App() {
    const [active, setActive] = React.useState(1);
    // Memoizing the Orb component to prevent unnecessary re-renders
    const orbMemo = useMemo(() => {
    return <Orb />
  }, [])
  // Display data based on the active state
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  }
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
        {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: url(${props => props.bg}) no-repeat center center fixed;
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    height: 90vh;
    overflow: auto;
    overflow-x: hidden;
    &&::-webkit-scrollbar {
    width: 0;
    }
  }
`;

export default App;
