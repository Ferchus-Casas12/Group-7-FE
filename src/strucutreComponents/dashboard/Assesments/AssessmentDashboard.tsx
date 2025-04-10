import { Box, ButtonGroup, Button } from "@mui/material";
import { CSSProperties, useState, useContext, useEffect } from "react";
import SegmentedProgressCircle from "../progressBars/SegmentedProgressCircle";
import AssessmentComponent from "./AssessmentComponent";
import { AuthContext } from "../../../hooks/contextProviders/AuthProvider";

type AssessmentData = {
  [key: string]: [boolean, number];
};

const placeHolderkData: AssessmentData = {
  test1: [true, 80],
  test2: [false, 0],
  test3: [true, 90],
  test4: [true, 100],
  test5: [false, 0],
  test6: [true, 76],
  test7: [true, 85],
  test8: [false, 0],
};

const assessmentEntries = Object.entries(placeHolderkData);
const rowChunks = [assessmentEntries.slice(0, 4), assessmentEntries.slice(4, 8)];

function AssesmentDashboard() {
  const [testMode, setTestMode] = useState(false);
  const [assessmentString, setAssessmentString] = useState("");
  const { user, userData } = useContext(AuthContext);

  const handleAssessmentClick = (assessmentId: string): void => {
    const prepare = async () => {
      await setAssessmentString(assessmentId);
      await setTestMode(true);
      console.log(assessmentId);
    };
    prepare();
  };

  useEffect(() => {
    // Check if userData is null or not
    if (userData) {
      console.log("User data is available:", userData);
    } else {
      console.log("User data is not available.");
    }

    console.log("user object or wtv:", user?.uid);
  }, []);

  if (testMode === false) {
    return (
      <div style={styles.holeWrapper}>
        <div style={styles.circlesWrapper}>
          <SegmentedProgressCircle
            r="70"
            cx="80"
            cy="80"
            strokeWidth="8"
            progress={67}
            title="Assessments"
          ></SegmentedProgressCircle>
          <SegmentedProgressCircle
            r="70"
            cx="80"
            cy="80"
            strokeWidth="8"
            progress={35}
            title="Lectures"
          ></SegmentedProgressCircle>
          <SegmentedProgressCircle
            r="70"
            cx="80"
            cy="80"
            strokeWidth="8"
            progress={95}
            title="Assignments"
          ></SegmentedProgressCircle>
        </div>
        <Box
          className="assessment-dashboard"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 3,
            backgroundColor: "#f4f5fb",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
          }}
        >
          {rowChunks.map((row, i) => (
            <ButtonGroup
              key={i}
              fullWidth
              sx={{
                justifyContent: "space-between",
                gap: 2,

                "& .MuiButton-root": {
                  flex: 1,
                  padding: 2,
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  border: "none",
                  textTransform: "none",
                },
              }}
            >
              {row.map(([key, [isCompleted, score]]) => (
                <Button
                  key={key}
                  variant="contained"
                  onClick={() => handleAssessmentClick(key)}
                  sx={{
                    backgroundColor: isCompleted ? "#bec2de" : "#bec2de",
                    color: isCompleted ? "#212121" : "#212121",
                    fontWeight: 600,
                    padding: 4,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: isCompleted ? "#b1b5ce" : "#b1b5ce",
                    },
                  }}
                >
                  {`ASSESSMENT - ${key.replace(/[^\d]/g, "")} | ${
                    isCompleted ? `Score: ${score}%` : "Incomplete"
                  }`}
                </Button>
              ))}
            </ButtonGroup>
          ))}
        </Box>
      </div>
    );
  }
  if (testMode === true) {
    return (
      <div>
                <Button
            variant="outlined"
            sx={{
              color: "#616783",
              marginBottom: 0,
              fontSize: 16,
              fontWeight: 600,
              borderColor: "#616783",
              width: "15vw",
              marginTop: 1,
              padding: 1,
            }}
            onClick={() => setTestMode(false)}
          >
            Back
          </Button>
        <AssessmentComponent assessmentId={assessmentString}></AssessmentComponent>
      </div>
    );
  }
}
export default AssesmentDashboard;

const styles: Record<string, CSSProperties> = {
  circlesWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "center",
    justifySelf: "center",
    width: "40%",
    marginBottom: 10,
  },
};
