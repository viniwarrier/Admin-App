import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#BF360C",
        dark: "#BF360C",
      },
      secondary: {
        main: "#7CB342",
        dark: "#558B2F",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
