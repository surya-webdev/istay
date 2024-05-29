import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContexts = createContext();

function DarkModeContext({ children }) {
  const [isDark, setIsDark] = useState(useLocalStorageState(false, "isDark"));

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");

        document.documentElement.classList.remove("light-mode");
      }
      if (!isDark) {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDark]
  );
  //
  function toggle() {
    setIsDark((isDark) => !isDark);
  }

  return (
    <DarkModeContexts.Provider value={{ toggle, isDark }}>
      {children}
    </DarkModeContexts.Provider>
  );
}

function useContextDark() {
  //
  const context = useContext(DarkModeContexts);

  if (context === undefined) throw new Error("Context is not deleivery");

  return context;
}

export { DarkModeContext, useContextDark };
