import { createContext, useState } from "react";
export const AppContext = createContext({
  theme: "dark",
  name: "NOOR",
  id: "ljlk432lals",
});

const Context = (props) => {
  const [theme, setTheme] = useState("light");

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};

export default Context;
