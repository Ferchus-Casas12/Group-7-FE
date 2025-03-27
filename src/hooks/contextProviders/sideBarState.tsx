import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface SideBarState {
  section: string;
}

interface SideBarContextType {
  section: SideBarState;
  setSection: Dispatch<SetStateAction<SideBarState>>;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const SideBarContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [section, setSection] = useState<SideBarState>({ section: "noSection" });
  console.log("section value: ", section);

  return (
    <SideBarContext.Provider value={{ section, setSection }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = (): SideBarContextType => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarContextProvider");
  }
  return context;
};
