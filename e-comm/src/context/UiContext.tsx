import { createContext, useEffect, useState } from "react";

export const UiContext = createContext<any>(null);

export const UiProvider = (props: any) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <UiContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {props.children}
    </UiContext.Provider>
  );
};
