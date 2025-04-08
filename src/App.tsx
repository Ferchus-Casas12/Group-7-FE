import { useContext } from "react";

import "./App.css";
import SideBar from "./strucutreComponents/sideNavigation/sideBar";
import DashBoardWrapper from "./strucutreComponents/dashboard/dashBoardWrapp";
import { SideBarContextProvider } from "./hooks/contextProviders/sideBarState";
import { AuthContext } from "./hooks/contextProviders/AuthProvider";
import AuthPage from "./strucutreComponents/AuthState/AuthPage";
import Header from "./strucutreComponents/Header/Header";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <Header></Header>
        <div>Loading</div>;
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header></Header>
        <AuthPage></AuthPage>;
      </>
    );
  }

  return (
    <>
      {/* <Header></Header> */}
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
    </>
  );
}

export default App;
