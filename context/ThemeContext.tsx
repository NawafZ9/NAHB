import { useLocalSearchParams, useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Theme, themes } from "../themes/theme";

// Define the type for theme names
export type ThemeName = "light" | "dark" | "blue";

// Define the context type
interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  themeName: "light",
  setTheme: () => {},
});

// Create a provider component
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
}) => {
  const router = useRouter();
  const { theme: themeParam } = useLocalSearchParams<{ theme?: ThemeName }>();

  // Use the theme from URL params or fall back to initialTheme
  const themeName = (themeParam as ThemeName) || initialTheme;

  // Get the actual theme object based on the theme name
  const theme = themes[themeName as keyof typeof themes] || themes.light;

  // Function to change the theme by updating URL params
  const setTheme = (name: ThemeName) => {
    router.setParams({ theme: name });
  };

  // Apply initial theme if not in URL
  useEffect(() => {
    if (!themeParam) {
      router.setParams({ theme: initialTheme });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
