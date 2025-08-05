import { useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useTheme("light");

  const changeTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { changeTheme };
};
