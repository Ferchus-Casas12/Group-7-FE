import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, db } from "../../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function FormPropsTextFields() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
  });

  const defaultProgress = {
    lecturesProgress: 0,
    assessmentsProgress: 0,
    assignmentsProgress: 0,
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    // Update just the relevant key in our state object
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.age.trim()
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter valid email format.");
      return;
    }

    // Validate password length (example: at least 6 characters)
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Validate age is a positive number
    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      toast.error("Please enter a valid age.");
      return;
    }

    const signUp = async () => {
      console.log("Form submitted with data:", formData);
      toast.info("Creating user...");

      try {
        const userCredential = await createUserWithEmailAndPassword(
          Auth,
          formData.email,
          formData.password
        );
        console.log("User credential created successfully:", userCredential.user);
        const user = userCredential.user;

        const userData = {
          uid: user.uid,
          email: user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          ...defaultProgress,
          createdAt: new Date(),
        };

        await setDoc(doc(db, "users", user.uid), userData);
        console.log("User created and stored in DB successfully");

        toast.dismiss();
        toast.success("User created succesfully!");
      } catch (error) {
        toast.error("Error creating user");
        console.log(error);
      }
    };

    signUp();
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30vw" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-firstName"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <TextField
          id="outlined-lastName"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <TextField
          id="outlined-age"
          label="Age"
          name="age"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={formData.age}
          onChange={handleChange}
        />

        <TextField
          required
          id="outlined-email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          required
          id="outlined-password"
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
}
