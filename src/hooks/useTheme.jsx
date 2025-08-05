import { useEffect, useState } from "react";

// localStorage'dan boshlang'ich theme olish
const themeFromLocal = () => {
  return localStorage.getItem("theme") || "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState(themeFromLocal());

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, changeTheme };
};
