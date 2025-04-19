// AuthProvider.tsx

import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Auth, db } from "../../components/firebase";
import { doc, onSnapshot} from "firebase/firestore";
//import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: userData | null;
  setUserData: React.Dispatch<React.SetStateAction<userData | null>>;
}

type assessment = {
  completed: boolean;
  id: string;
  score: number;
}

type sections = {
  assignments: { [key: string]: { score: number; completed: any; id: string } };
  sectionProgress: number;
  lectures: { [key: string]: { completed: boolean; id: string } };
  assignmentProgress: number;
  lectureProgress: number;
}

interface userData {
  firstName: string;
  lastName: string;
  age: number;
  
  overallProgress: {
    totalProgress: number;
  };
  sections: {[key: string]: sections};
  assessments: {[key: string]: assessment};
  assessmentProgress: number;
 
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  setUserData: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userData | null>(null);
    

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(Auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
  
        // Realtime listener
        const unsubscribeUser = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data() as userData);
            } else {
              console.warn("User document not found");
              setUserData(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error listening to user data:", error);
            setLoading(false);
          }
        );
  
        // Clean up Firestore listener when auth changes or component unmounts
        return () => unsubscribeUser();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
  
    return () => unsubscribeAuth();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, setUserData, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

