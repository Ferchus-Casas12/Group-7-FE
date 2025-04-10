import { CSSProperties, useState } from "react";
import { useSideBarContext } from "../../hooks/contextProviders/sideBarState";
import AssesmentDashboard from "./Assesments/AssessmentDashboard";
import LectureDashBoard from "./Lectures/LectureDashBoard";
import LectureComponent from "./Lectures/LectureComponent";

function DashBoardWrapper() {
  const { section } = useSideBarContext();

  const renderSectionComponent = () => {
    switch (section.section) {
      case "Assessments":
        return <AssesmentDashboard></AssesmentDashboard>;
      case "Assignments":
        return null;
      case "Lectures":
        return <LectureDashBoard></LectureDashBoard>;
      case "Grades":
        return null;
      case "Home":
        return null;
      case "Settings":
        return null;
    }
  };

  return (
    <div style={styles.Wrapper}>
      <div style={styles.WrapperHeader}>
        <span style={styles.header}>{section.section}</span>

        {renderSectionComponent()}
      </div>
    </div>
  );
}

export default DashBoardWrapper;

const styles: Record<string, CSSProperties> = {
  Wrapper: {
    height: "94vh",
    width: window.innerWidth,
    backgroundColor: "#e0e2ee",
    marginLeft: 12,
    borderRadius: 10,
    padding: 15,
  },
  WrapperHeader: {},
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#616783",
  },
};
