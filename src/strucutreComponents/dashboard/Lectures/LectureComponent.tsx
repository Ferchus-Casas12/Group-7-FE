import AwesomeSlider from "react-awesome-slider";
import { CSSProperties, useState, useEffect } from "react";
import "react-awesome-slider/dist/styles.css";
import { Modal, Box, Button} from "@mui/material";

interface LectureComponentProps {
  sectionTitle: string; // ex. 1. communication skills
  lectureNumber: string;// ex. Lecture 1.1
}

function LectureComponent({ sectionTitle, lectureNumber }: LectureComponentProps) {
  const [imageURLs, setImageURLs] = useState<string[]>([]); // slide urls
  const [open, setOpen] = useState<boolean>(false); // opens and closes the pop up for the lecture
  const [loading, setLoading] = useState<boolean>(false); //for loading the lectures
  const [imagesReady, setImagesReady] = useState<boolean>(false); // wait for images

  useEffect(() => {
    setOpen(true); // open the pop out automatically 
    fetchLectureImages();
  }, []); // empty array to run when the lecture is mounted

  const fetchLectureImages = async () => { // fetch the urls
    setLoading(true); // loading set to true
    setImagesReady(false); //set the images to not ready before fetching
    try {
      const response = await fetch( //fetch function = to section id
        `https://us-central1-coursemanagementsystem-8d873.cloudfunctions.net/getLectures?sectionId=${sectionTitle}`
      );

      if (!response.ok) throw new Error("Failed to get lecture data");

      const data = await response.json();
      const lectureData = data.find(
        (lecture: { lectureName: string }) => lecture.lectureName === lectureNumber // find the lecture based on the lectureNumber
      );

      if (lectureData && Array.isArray(lectureData.images)) { //if lecture images are found 
        let images = lectureData.images.flat(); // used to extract the urls , from the array
        const urls = images
          .map((img: any) => (typeof img === "string" ? img : img?.url))
          .filter(Boolean);

        setImageURLs(urls); // store the urls

        
        let loadedCount = 0; // preload images to make sure they are ready - used cause they flicker in the slider 
        urls.forEach((url: string) => { // kinda doestn fix it i tried multiple things this is the one that worked the best
          const img = new Image();
          img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === urls.length) { // when they are ready set to true
              setImagesReady(true);
            }
          };
          img.src = url;
        });
      } else {
        console.error("No images found");
      }
    } catch (error) {
      console.error("Error getting lectures", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    //open the pop up automaticallly
    <div>  
      <Modal open={open} onClose={() => setOpen(false)}>   
        <Box sx={modalStyles.wrapper}>
          {/* button for closing */}
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
              color: "#000",
              borderColor: "#000",
            }}
          >
            Close
          </Button>

          {/* set to render the images depneding on the state */}
          {loading ? (
            <span style={styles.header}>Loading slides...</span>
          ) : imageURLs.length === 0 ? (
            <span style={styles.header}>No slides found for this lecture.</span>
          ) : !imagesReady ? (
            <span style={styles.header}>Preparing slides...</span>
          ) : (
            //slider for the lecture
            <AwesomeSlider style={awesomeSlideStyles}> 
              {imageURLs.map((url, index) => (
                <div key={index} style={slideContainer}>
                  <img src={url} alt={`Slide ${index + 1}`} style={imageStyles} />
                </div>
              ))}
            </AwesomeSlider>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LectureComponent;

const styles: Record<string, CSSProperties> = { // style the header 
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "red",
  },
};

const modalStyles = { //setting for pop up
  wrapper: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85vw",
    height: "85vh",
    bgcolor: "#fff",
    borderRadius: 4,
    boxShadow: 24,
    outline: "none",
    p: 2,
  },
};

const awesomeSlideStyles: React.CSSProperties = {
  // CSS custom properties must be passed as string keys
  width: "100%",
  height: "95%",
  ["--slider-height-percentage" as any]: "100%",
  ["--slider-transition-duration" as any]: "300ms",
  ["--organic-arrow-thickness" as any]: "4px",
  ["--organic-arrow-height" as any]: "40px",
  ["--organic-arrow-color" as any]: "#000000",
  ["--control-button-width" as any]: "5%",
  ["--control-button-height" as any]: "25%",
  ["--control-button-background" as any]: "transparent",
  ["--control-bullet-color" as any]: "#000000",
  ["--control-bullet-active-color" as any]: "#6bae47",
  ["--loader-bar-color" as any]: "#851515",
  ["--loader-bar-height" as any]: "6px",
  margin: "0 auto", //center the slider
  paddingTop: "0px", //add paddint to the top
  marginBottom: "12px",
};

const slideContainer: React.CSSProperties = { //for each individual image
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const imageStyles: React.CSSProperties = {
  width: "85%",
  height: "auto",
  objectFit: "contain",
  transform: "scaleX(1.2)", //Adjust the scale as needed - horizontal strech
  transformOrigin: "center", // Optional: controls where the scale happens from 
  display: "block",
  margin: "0 auto",
};
