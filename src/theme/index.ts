import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fb8da0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#fb8da0",
          borderRadius: "0",
          boxShadow: "none",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fff",
            boxShadow: "none",
            color: "#fb8da0",
          },
        },
        outlinedPrimary: {
          background: "#fff",
          border: "1px solid #fb8da0",
          borderRadius: "0",
          color: "#fb4570",
          "&:hover": {
            backgroundColor: "#fb8da0",
            color: "#FFF",
          },
        },
        textPrimary: {
          color: "#887bb0",
          "&:hover": {
            backgroundColor: "rgba(255, 105, 180, 0.1)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#fb8da0",
          "&.Mui-checked": {
            color: "#fb8da0",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-colorPrimary": {
            backgroundColor: "#887bb0",
            color: "#FFF",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: "0",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "none",
          },
        },
      },
    },
  },
  typography: {
    allVariants: {
      lineHeight: 1.25,
    },
    fontFamily: "'Roboto Flex', 'Inter', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#222",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
      color: "#666",
    },
    subtitle2: {
      fontSize: "0.875rem",
      color: "#777",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});
