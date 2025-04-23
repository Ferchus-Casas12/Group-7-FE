import { Box, ButtonGroup, Button } from "@mui/material";
import { CSSProperties, useState, useContext, useEffect } from "react";
import SegmentedProgressCircle from "../progressBars/SegmentedProgressCircle";
import AssessmentComponent from "./AssessmentComponent";
import { AuthContext } from "../../../hooks/contextProviders/AuthProvider";

type assessmentData = {  //data missing id - dont think we need
  completed?: boolean;
  score?: string | null;
};

function AssesmentDashboard() {   //displays the assesment dashboard
  const [testMode, setTestMode] = useState(false);
  const [assessmentString, setAssessmentString] = useState("");
  const { userData } = useContext(AuthContext);

  
  if (!userData) { // make sure `userData` is available before continuing
    return <div>Loading...</div>;
  }

  const assessmentData = userData?.assessments || {}; //get data and progress from user data
  const avgAssessmentProgress = userData?.assessmentProgress || 0;

  const defaultAssessments: [string, assessmentData][] = Array.from({ length: 8 }, (_, i) => { //make sure assessments show up 
    const id = `assessment${i + 1}`;
    const existing = assessmentData[id] || {}; // get data or empty object if no data
    return [
      id,
      {
        completed: existing.completed || false,
        score: existing.score?.toFixed(2) || null,
      },
    ] as [string, { completed: boolean; score: string | null }];
  });

  const rowChunks = [
    defaultAssessments.slice(0, 4),
    defaultAssessments.slice(4, 8),
  ];

  const handleAssessmentClick = (assessmentId: string): void => { //changed
    setAssessmentString(assessmentId);
    setTestMode(true);
  };

  useEffect(() => {
    if (userData) {
      console.log("user data is available", userData);
    } else {
      console.log("user data is not available");
    }
  }, [userData]); // runs whenever data changes

  if (testMode) { // if in test mode show assessment component
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
        <AssessmentComponent assessmentId={assessmentString} onSubmitCallback={() => setTestMode(false)} />
      </div>
    );
  }

  return (
    <div style={styles.holeWrapper}>
      <div style={styles.circlesWrapper}>
        <SegmentedProgressCircle
          r="70"
          cx="80"
          cy="80"
          strokeWidth="8"
          progress={avgAssessmentProgress}
          title="Assessments"
        />
        
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
            {row.map(([key, value]) => { 
              const { completed, score } = value as { completed?: boolean; score?: string | null };
              return (
                <Button
                  key={key}
                  variant="contained"
                  onClick={() => handleAssessmentClick(key)} // go to test mode on click
                  sx={{
                    backgroundColor: completed ? "#bec2de" : "#bec2de",
                    color: completed ? "#212121" : "#212121",
                    fontWeight: 600,
                    padding: 4,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: completed ? "#b1b5ce" : "#b1b5ce",
                    },
                  }}
                >
                  {`ASSESSMENT - ${String(key).replace(/[^\d]/g, "")} | ${
                    completed && score !== null && score !== undefined
                      ? `Score: ${parseFloat(score.toString()).toFixed(2)}%`
                      : "Incomplete"
                  }`}
                </Button>
              );
            })}
          </ButtonGroup>
        ))}
      </Box>
    </div>
  );
}

export default AssesmentDashboard;

const styles: Record<string, CSSProperties> = {
  circlesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: "40%",
    marginBottom: 10,
  },
};
