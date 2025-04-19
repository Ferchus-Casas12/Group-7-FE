import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Basic validations
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      toast.error("Please enter a valid age.");
      return;
    }

    const signUp = async () => {
      toast.info("Creating user...");

      try {
        // Step 1: Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          Auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        // Step 2 (optional): Set displayName (not required unless needed)
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });

        // Step 3: Patch user document with additional profile info AFTER onCreate function runs
        await setDoc(
          doc(db, "users", user.uid),
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
          },
          { merge: true }
        );

        toast.dismiss();
        toast.success("User created successfully!");
        console.log("User signed up and patched successfully.");
      } catch (error) {
        toast.dismiss();
        toast.error("Error creating user.");
        console.error(error);
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
