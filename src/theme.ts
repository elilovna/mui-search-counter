import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    mono?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mono: true;
  }
}

const base = createTheme();

const shadows = [...base.shadows] as typeof base.shadows;
shadows[1] = "0 4px 24px rgba(17, 24, 39, 0.06)";
shadows[2] = "0 8px 28px rgba(17, 24, 39, 0.1)";

export const theme = createTheme({
  shadows,
  palette: {
    mode: "light",
    primary: {
      main: "#0D9488",
      dark: "#0F766E",
      light: "#CCFBF1",
      contrastText: "#FFFFFF",
    },
    success: { main: "#0D9488", light: "#CCFBF1", dark: "#0F766E" },
    error: { main: "#E74C3C" },
    warning: { main: "#F59E0B" },
    background: { default: "#F7F8FA", paper: "#FFFFFF" },
    text: { primary: "#111827", secondary: "#6B7280" },
    divider: "#E5E7EB",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'Inter, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h2: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
    mono: {
      fontFamily: "monospace",
      fontSize: "0.875rem",
      letterSpacing: 1,
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 99,
          textTransform: "none",
          fontWeight: 600,
          paddingLeft: theme.spacing(2.25),
          paddingRight: theme.spacing(2.25),
        }),
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5 },
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { color: "success", variant: "filled" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
            fontWeight: 600,
          }),
        },
      ],
    },
  },
});
