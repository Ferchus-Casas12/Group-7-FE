import { useState } from "react";

import "./App.css";
import SideBar from "./strucutreComponents/sideNavigation/sideBar";
import DashBoardWrapper from "./strucutreComponents/dashboard/dashBoardWrapp";
import { SideBarContextProvider } from "./hooks/contextProviders/sideBarState";

function App() {
  return (
    <SideBarContextProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
          marginTop: 10,
          marginLeft: 0,
        }}
      >
        <SideBar></SideBar>
        <DashBoardWrapper></DashBoardWrapper>
      </div>
    </SideBarContextProvider>
  );
}

export default App;
