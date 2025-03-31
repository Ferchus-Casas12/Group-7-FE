import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../components/firebase";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
  });

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
    if (!formData.email.trim() || !formData.password.trim()) {
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

    const signUp = async () => {
      console.log("Form submitted with data:", formData);
      toast.info("Signing in");

      try {
        const userCredential = await signInWithEmailAndPassword(
          Auth,
          formData.email,
          formData.password
        );
        console.log("signed in successfully", userCredential.user);

        const user = userCredential.user;
        console.log(user);
        toast.dismiss();
        toast.success("User Signed in succesfully!");
      } catch (error) {
        toast.error("Error Signing in");
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
