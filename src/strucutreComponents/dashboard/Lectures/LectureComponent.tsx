import AwesomeSlider from "react-awesome-slider";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { CSSProperties, useEffect, useState } from "react";
import "react-awesome-slider/dist/styles.css";
import { storage } from "../../../components/firebase";
const folderRef = ref(storage, "lectures/1. Communication Skills/Lecture 1.1");
function LectureComponent() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleTransitionEnd = () => {
    return null;
  };
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const results = await listAll(folderRef);
        console.log(results.items);
        const urls = await Promise.all(results.items.map((item) => getDownloadURL(item)));
        setImageURLs(urls);
      } catch (error) {
        console.error("error fetching images for lectre:", error);
      }
    };

    getAllImages();
  }, []);

  if (imageURLs.length === 0) {
    return <span style={styles.header}>fernando</span>;
  }

  return (
    <AwesomeSlider style={awesomeSlideStyle} onTransitionEnd={handleTransitionEnd}>
      {imageURLs.map((url, index) => (
        <div data-src={url} key={index}></div>
      ))}
    </AwesomeSlider>
  );
}

export default LectureComponent;

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
    color: "red",
  },
};

const awesomeSlideStyle: React.CSSProperties = {
  // CSS custom properties must be passed as string keys
  ["--slider-height-percentage" as any]: "60%",
  ["--slider-transition-duration" as any]: "300ms",
  ["--organic-arrow-thickness" as any]: "4px",
  ["--organic-arrow-border-radius" as any]: "0px",
  ["--organic-arrow-height" as any]: "40px",
  ["--organic-arrow-color" as any]: "#000000",
  ["--control-button-width" as any]: "10%",
  ["--control-button-height" as any]: "25%",
  ["--control-button-background" as any]: "transparent",
  ["--control-bullet-color" as any]: "#000000",
  ["--control-bullet-active-color" as any]: "#6bae47",
  ["--loader-bar-color" as any]: "#851515",
  ["--loader-bar-height" as any]: "6px",
  transform: "scale(0.85) translateY(-40px)", // Adjust the scale as needed
  transformOrigin: "center center", // Optional: controls where the scale happens from

  margin: "0 auto", // Center the slider
  paddingTop: "0px", // Add padding to the top
};
