import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { Auth } from "../../components/firebase";
import { useContext } from "react";

interface userData {
  firstName: string;
  lastName: string;
  assessmentProgress: number;
  assignmentProgrss: number;
  lecturesProgress: number;
}

function Header() {
  if (Auth.currentUser) {
    const currentUser = Auth.currentUser;
  }
  return (
    <div
      id="iconsDiv"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 10,
        backgroundColor: "#e0e2ee",
        paddingBottom: 7,
        paddingTop: 7,
        marginTop: 0,
        width: "100vw",
        height: "5vh",
      }}
    >
      <BookOutlinedIcon fontSize="large" style={{ marginRight: 15, color: "#616783" }} />

      <span>{Auth.currentUser?.email}</span>
    </div>
  );
}

export default Header;
