// components/Survey.tsx
import "survey-core/survey-core.css";

import { useEffect, useState } from "react";
import { db } from "../../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { DoubleBorderLight } from "survey-core/themes";

interface AssessmentComponentProps {
  assessmentId: string;
}

// we use the assessment id to dinamically change the fectch call, essentially the test id will
//dinamically change the name of the fectch call, which in reality we use witbh firebase, firestore framework
function AssessmentComponent({ assessmentId }: AssessmentComponentProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // Initialize Firestore (make sure you've already initialized Firebase in your project)

        // Get a reference to the document in the "tests" collection with ID "Tests"
        const docRef = doc(db, "tests", "Tests");

        // Retrieve the document snapshot
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Access the field "test1" which contains the large JSON string
          const jsonString = docSnap.data()[assessmentId];

          // Parse the JSON string into a JavaScript object
          const jsonData = JSON.parse(jsonString);
          setData(jsonData);
        } else {
          throw new Error("Document does not exist");
        }
      } catch (error) {
        toast.error("error fetching test!");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  if (data) {
    const survey = new Model(data);
    survey.applyTheme(DoubleBorderLight);
    return (
      <div style={{ height: "97vh" }}>
        <Survey model={survey} />
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Fetched JSON Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AssessmentComponent;
