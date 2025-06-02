// themes.ts
export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  button: string;
}

export const LightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#007bff",
  secondary: "#6c757d",
  button: "#007bff",
};

export const DarkTheme: Theme = {
  background: "#121212",
  text: "#ffffff",
  primary: "#bb86fc",
  secondary: "#03dac6",
  button: "#bb86fc",
};

export const BlueTheme: Theme = {
  background: "#e0f7fa",
  text: "#006064",
  primary: "#00acc1",
  secondary: "#4dd0e1",
  button: "#00acc1",
};

export const themes = {
  light: LightTheme,
  dark: DarkTheme,
  blue: BlueTheme,
};
