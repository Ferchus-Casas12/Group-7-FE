import { CSSProperties } from "react";
import { useSideBarContext } from "../../hooks/contextProviders/sideBarState";

function DashBoardWrapper() {
  const { section } = useSideBarContext();
  return (
    <div style={styles.Wrapper}>
      <div style={styles.WrapperHeader}>
        <span style={styles.header}>{section.section}</span>
      </div>
    </div>
  );
}

export default DashBoardWrapper;

const styles: Record<string, CSSProperties> = {
  Wrapper: {
    height: 750,
    width: window.innerWidth,
    backgroundColor: "#e0e2ee",
    marginLeft: 12,
    borderRadius: 10,
    padding: 15,
    },
    WrapperHeader: {

    },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#616783",
  },
};
