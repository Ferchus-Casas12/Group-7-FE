import { useState } from "react";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { Button } from "@mui/material";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

function AuthPage() {
  const [option, setOption] = useState("signup");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderWidth: 5,
          borderStyle: "solid",
          backgroundColor: "#ffffff",
          width: "33vw",
          height: "87vh",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
          <div
            id="iconsDiv"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              marginBottom: 50,
              borderRadius: 5,
              backgroundColor: "#e0e2ee",
              paddingBottom: 25,
              marginTop: 0,
            }}
          >
            <BookOutlinedIcon
              fontSize="large"
              style={{ marginRight: 15, color: "#616783" }}
            />
            <img
              src="src/assets/images/LaredoPublicHealth.png"
              style={{ width: 80 }}
              alt="Laredo Public Health"
            />
          </div>

          {option === "signup" ? <SignUpPage></SignUpPage> : <SignInPage></SignInPage>}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              justifyItems: "center",
              alignContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {option === "signup" ? (
              <>
                <span style={{ color: "#000000", paddingRight: 3, fontSize: 14 }}>
                  Already an user?
                </span>
              </>
            ) : (
              <>
                <span style={{ color: "#000000", paddingRight: 3, fontSize: 14 }}>
                  Not registered yet?
                </span>
              </>
            )}

            <Button
              variant="text"
              href="#outlined-buttons"
              size="large"
              onClick={() => {
                option === "signup" ? setOption("signin") : setOption("signup");
              }}
            >
              {option === "signup" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
