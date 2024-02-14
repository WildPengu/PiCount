import React, { useEffect, createContext, useState, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "DarkTheme",
  setTheme: () => {},
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getTheme = (): string => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "DarkTheme");
    return "DarkTheme";
  } else {
    return theme;
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(getTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "DarkTheme" ? "LightTheme" : "DarkTheme"
    );
  };

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
