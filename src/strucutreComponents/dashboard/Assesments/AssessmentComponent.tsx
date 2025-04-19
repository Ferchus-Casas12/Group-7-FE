// components/Survey.tsx
import "survey-core/survey-core.css";

import { useEffect, useState } from "react";
import { db } from "../../../components/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { DoubleBorderLight } from "survey-core/themes";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/contextProviders/AuthProvider";

interface AssessmentComponentProps {
  assessmentId: string;
  onSubmitCallback?: () => void; // callback when assessment is submited
}

// we use the assessment id to dinamically change the fectch call, essentially the test id will
//dinamically change the name of the fectch call, which in reality we use witbh firebase, firestore framework
function AssessmentComponent({ assessmentId, onSubmitCallback }: AssessmentComponentProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, userData } = useContext(AuthContext);
  

  useEffect(() => { // fetech assesemnt data based on assessment id
    const fetchAssessmentFromFunction = async () => {
      try {
        const response = await fetch("https://us-central1-coursemanagementsystem-8d873.cloudfunctions.net/getAllAssessments", { // fecth from function
          method: "GET"
        });
        const result = await response.json();
        console.log(result);

        if (result.message === "Assessments fetched successfully") {
          const jsonString = result.data[assessmentId]; // Extract the one you need
          const parsed = JSON.parse(jsonString);
          setData(parsed);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching test!");
      } finally {
        setLoading(false);
      }
    };
    

    fetchAssessmentFromFunction(); // call the fucntion that was fetched
  }, [assessmentId]);

  if (loading) return <div>Loading...</div>;

  if (userData?.assessments?.[assessmentId]?.completed) { // check if assessment is compelted
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>You have already completed this assessment.</h3>
      </div>
    );
  }

  if (data) {
    const survey = new Model(data);
    survey.applyTheme(DoubleBorderLight);

    

    survey.onComplete.add(async (sender) => {
      const correctAnswers = sender.getCorrectAnswerCount();
      const totalQuestions = sender.getAllQuestions().length;
      const score = (correctAnswers / totalQuestions) * 100;
      
    if (!user?.uid) {
     toast.error("User not found");
      return;
    }

      try {
        const userRef = doc(db, "users", user.uid); // Reference to user's document
        await updateDoc(userRef, {
          [`assessments.${assessmentId}.score`]: score, // Store the score inside the assessments object
        });  

      toast.success(`You scored ${correctAnswers} out of ${totalQuestions} (${score.toFixed(2)}%)`, {
        position: "top-center",
        className: "custom-toast",
        autoClose: 8000, // optional: duration
      });

      if (onSubmitCallback) onSubmitCallback(); // call teh onsubmite fucntion 

    } catch (error) {
      console.error("Error updating the score in Firestore:", error);
      toast.error("Failed to save your score!");
    }
    });
    return (
      <div style={{ height: "80vh" }}>
        <Survey model={survey} />
      </div>
    );
  }


  return (
    <div>
      <h1>Fetched JSON Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AssessmentComponent;
