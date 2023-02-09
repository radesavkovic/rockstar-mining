import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d8a909"
    },
    secondary: {
      main: "#d8a909"
    },
    text: {
      primary: "#ffff"
    }
  },
  typography: {
    fontFamily: "'Titan One', cursive",

    body1: {
      fontFamily: "'Syncopate', sans-serif",
      fontSize: 18,
      color: "#fff"
    },
    body2: {
      fontFamily: "'Syncopate', sans-serif",
      fontSize: 16,
      color: "#fff"
    },
    allVariants: {
      color: "#d8a909"
    },
    h3: {
      fontSize: 45
    },
    h4: {
      fontSize: 32
    },
    h5: {
      fontSize: 24
    },
    h6: {
      fontSize: 24,
      color: "#ffffff"
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    }
  }
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
