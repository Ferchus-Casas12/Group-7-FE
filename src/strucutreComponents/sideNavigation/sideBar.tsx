import { CSSProperties } from "react";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useSideBarContext } from "../../hooks/contextProviders/sideBarState";

function SideBar() {
  // Correct destructuring
  const { section, setSection } = useSideBarContext();

  // For consistent icon alignment
  const iconContainerStyle: CSSProperties = {
    width: 30,
    display: "flex",
    justifyContent: "center",
  };

  const textStyle: CSSProperties = {
    fontWeight: "bolder",
    fontSize: 11,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  };

  return (
    <div style={styles.mainWrapper}>
      {/* Header/logo area */}
      <div
        id="iconsDiv"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: 50,
          borderRadius: 5,
          backgroundColor: "#e0e2ee",
          paddingBottom: 25,
          marginTop: 0,
        }}
      >
        <BookOutlinedIcon fontSize="large" style={{ marginRight: 15, color: "#616783" }} />
        <img
          src="src/assets/images/LaredoPublicHealth.png"
          style={{ width: 80 }}
          alt="Laredo Public Health"
        />
      </div>

      {/* Example Button 1: Home */}
      <Button
        key="Home"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1.5,
          width: "10vw",
          py: 1,
          color: section.section === "Home" ? "black" : "#616783",
          backgroundColor: section.section === "Home" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Home" }))}
      >
        <div style={iconContainerStyle}>
          <HomeOutlinedIcon />
        </div>
        <span style={textStyle}>Home</span>
      </Button>

      {/* Example Button 2: Lectures */}
      <Button
        key="Lectures"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1,
          width: "10vw",
          py: 1,
          color: section.section === "Lectures" ? "black" : "#616783",
          backgroundColor: section.section === "Lectures" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Lectures" }))}
      >
        <div style={iconContainerStyle}>
          <ViewDayOutlinedIcon />
        </div>
        <span style={textStyle}>Lectures</span>
      </Button>

      {/* Example Button 3: Assignments */}
      <Button
        key="Assignments"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1,
          width: "10vw",
          py: 1,
          color: section.section === "Assignments" ? "black" : "#616783",
          backgroundColor: section.section === "Assignments" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Assignments" }))}
      >
        <div style={iconContainerStyle}>
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <span style={textStyle}>Assignments</span>
      </Button>

      {/* Example Button 4: Quizzes */}
      <Button
        key="Quizzes"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1,
          width: "10vw",
          py: 1,
          color: section.section === "Quizzes" ? "black" : "#616783",
          backgroundColor: section.section === "Quizzes" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Quizzes" }))}
      >
        <div style={iconContainerStyle}>
          <HomeOutlinedIcon />
        </div>
        <span style={textStyle}>Quizzes</span>
      </Button>

      {/* Example Button 5: Grades */}
      <Button
        key="Grades"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1.5,
          width: "10vw",
          py: 1,
          color: section.section === "Grades" ? "black" : "#616783",
          backgroundColor: section.section === "Grades" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Grades" }))}
      >
        <div style={iconContainerStyle}>
          <EqualizerIcon />
        </div>
        <span style={textStyle}>Grades</span>
      </Button>

      {/* Example Button 6: Settings */}
      <Button
        key="Settings"
        variant="text"
        sx={{
          marginBottom: 0.3,
          borderRadius: 1,
          width: "10vw",
          py: 1,
          color: section.section === "Settings" ? "black" : "#616783",
          backgroundColor: section.section === "Settings" ? "#e0e2ee" : "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 1,
        }}
        onClick={() => setSection(prev => ({ ...prev, section: "Settings" }))}
      >
        <div style={iconContainerStyle}>
          <HomeOutlinedIcon />
        </div>
        <span style={textStyle}>Settings</span>
      </Button>
    </div>
  );
}

export default SideBar;

const styles: Record<string, CSSProperties> = {
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: window.innerWidth * 0.09,
    marginLeft: 12,
    alignSelf: "self-start",
  },
};
