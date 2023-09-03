export const themeOptions = {
  direction: "ltr",

  breakpoints: {
    values: { xs: 0, sm: 600, ipad: 830, md: 900, lg: 1200, xl: 1920 },
  },

  zIndex: { appBar: 1200, drawer: 1100 },

  palette: {
    type: "light",

    primary: {
      main: "#e53935",
      dark: "#b72e2a",
    },

    secondary: {
      main: "#333333",
      dark: "#292929",
    },

    info: {
      main: "rgba(255,0,0,0.69)",
    },
  },

  typography: {
    fontFamily: "Candara",
  },

  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        underline: "none",
        color: "primary",
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: "normal",
        size: "small",
      },
    },

    MuiInput: {
      defaultProps: {
        fullWidth: true,
        margin: "none",
      },
    },

    MuiInputBase: {
      defaultProps: {
        fullWidth: true,
      },
    },

    MuiFab: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        size: "small",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        item: {
          display: "grid",
          placeItems: "center",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },

    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },

    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          "&.MuiListItemIcon-root": {
            minWidth: "unset",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontWeight: 500,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },

    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
          ":first-of-type": {
            borderRadius: "0.4rem",
          },
          ":last-of-type": {
            borderRadius: "0.4rem",
          },
        },
      },
    },
  },
};
