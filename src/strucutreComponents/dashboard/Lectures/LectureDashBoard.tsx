import { Box, Button } from "@mui/material";
import { useState } from "react";
import SegmentedProgressCircle from "../progressBars/SegmentedProgressCircle";
import LectureComponent from "./LectureComponent";


const sectionNames = [ // section names they dont do much 
  "1. Communication Skills",
  "2. Interpersonal Skills",
  "3. Service Coordination",
  "4. Capacity Building Skills",
  "5. Advocacy Skills",
  "6. Teaching Skills",
  "7. Organizational Skills",
  "8. Knowledge Base",
];

function LectureDashboard() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null); 
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null); 
  const [lectureList, setLectureList] = useState<string[]>([]);

  const handleSectionClick = async (sectionId: string) => {
    
    setSelectedSection(sectionId); // selected section
    setSelectedLecture(null); // clear the lecture selected

    try {
      const response = await fetch( // get the section lecture list from the function using the section id
        `https://us-central1-coursemanagementsystem-8d873.cloudfunctions.net/getLectures?sectionId=${encodeURIComponent(sectionId)}`
      );
  
      if (!response.ok) throw new Error("Failed to get lecture data");
  
      const data = await response.json();
  
      
      const lectures = data // get and sort lecture names
        .map((lecture: { lectureName: string }) => {
          return lecture.lectureName;
        })
        .sort();
  
      setLectureList(lectures); //store the lecture names
    } catch (error) {
      
      setLectureList([]); // reset if error
    }
  };

  const handleBack = () => { // go back
    if (selectedLecture) {
      setSelectedLecture(null); // from lecture to lecture list
    } else {
      setSelectedSection(null); // from lecture list to section list
      setLectureList([]);
    }
  };

  if (selectedSection && selectedLecture) { // if in section and lecture - show lecture
    return (
      <Box>
        {/* button to go back */}
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
            borderRadius: 3,
          }}
          onClick={handleBack}
        >
          Back
        </Button>

        {/* send selectedSection and selectedLecture to the LectureComponent */}
        <LectureComponent
          sectionTitle={selectedSection}
          lectureNumber={selectedLecture}
        />
      </Box>
    );
  }

  if (selectedSection && !selectedLecture) { // when section is selected but no lecture selected
    return (
      <>
      {/* back button to return to section list*/}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", px: 0, mb: 3 }}>
          <Button
            variant="outlined"
            sx={{
              color: "#616783",
              fontSize: 16,
              fontWeight: 600,
              borderColor: "#616783",
              borderRadius: 3,
              width: "15vw",
              marginBottom: 0,
              padding: 1,
            }}
            onClick={handleBack}
          >
            Back to Sections
          </Button>
        </Box>
        
            {/* progress circle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <SegmentedProgressCircle
            r="70"
            cx="80"
            cy="80"
            strokeWidth="8"
            progress={50} // will replace later dont have setup yet
            title={`${selectedSection} Progress`}
          />
        </Box>
            {/* lecture list for the section selected */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 3,
            backgroundColor: "#f4f5fb",
            borderRadius: 4,
            boxShadow: "none",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {lectureList.map((lectureName) => (
              <Button
                key={lectureName}
                variant="contained"
                onClick={() => setSelectedLecture(lectureName)}
                sx={{
                  backgroundColor: "#bec2de",
                  color: "#212121",
                  fontWeight: 600,
                  padding: 2,
                  fontSize: "1rem",
                  borderRadius: 3,
                  flex: "1 1 45%",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#b1b5ce",
                  },
                }}
              >
                {lectureName.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Box>
      </>
    );
  }
 // if no section is selected 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
        backgroundColor: "#f4f5fb",
        borderRadius: 4,
        boxShadow: "none",
      }}
    >
      {/* button arrangement */}
      {sectionNames.reduce<string[][]>((rows, section, idx) => {
        const rowIndex = Math.floor(idx / 4);
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(section);
        return rows;
      }, []).map((row) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {row.map((sectionTitle) => (
            <Button
              key={sectionTitle}
              variant="contained"
              onClick={() => handleSectionClick(sectionTitle)}
              sx={{
                backgroundColor: "#bec2de",
                color: "#212121",
                fontWeight: 600,
                padding: 2,
                fontSize: "1rem",
                borderRadius: 3,
                flex: 1,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#b1b5ce",
                },
              }}
            >
              SECTION - {sectionTitle.split(".")[0]}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default LectureDashboard;
