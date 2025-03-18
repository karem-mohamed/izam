import { useContext } from "react";

import { SideBarContext } from "./sideBar.context";

const useSideBarContext = () => {
  const context = useContext(SideBarContext);

  if (context === undefined) {
    throw new Error("useSideBarContext must be used within an SideBarProvider");
  }

  return context;
};

export default useSideBarContext;
