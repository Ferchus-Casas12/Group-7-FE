// AuthProvider.tsx

import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Auth, db } from "../../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: userData | null;
}

interface userData {
  firstName: string;
  lastName: string;
  assessmentProgress: number;
  assignmentProgrss: number;
  lecturesProgress: number;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: {
    firstName: "",
    lastName: "",
    assessmentProgress: 0,
    assignmentProgrss: 0,
    lecturesProgress: 0,
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userData | null>({
    firstName: "",
    lastName: "",
    assessmentProgress: 0,
    assignmentProgrss: 0,
    lecturesProgress: 0,
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    // Subscribe to user state changes

    const getUserData = async () => {
      // Get the currently signed-in user
      const currentUser = Auth.currentUser;
      if (!currentUser) {
        return;
      }

      try {
        // Reference the user's document in Firestore (assuming document ID is the user's UID)
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as userData);
          toast.success("successfully fetched and set user data");
        } else {
          console.error("No user data found for the current user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(Auth, (firebaseUser) => {
      setUser(firebaseUser);
      console.log(firebaseUser);
      setLoading(false);
    });

    getUserData();
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
