import { alpha } from "@mui/material/styles";
import { menuItemClasses } from "@mui/material/MenuItem";
import { pickersDayClasses, yearCalendarClasses } from "@mui/x-date-pickers";

// src/theme/mui/components.js
export default function getComponents(theme) {
  const { palette, typography, shape } = theme;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #__next": {
          direction: "rtl",
          fontFamily: typography.fontFamily,
          backgroundColor: palette.background?.default,
          color: palette.text?.primary,
        },
        "input, textarea, select, button": {
          fontFamily: typography.fontFamily,
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          padding: "8px 14px",
          marginLeft: "0px !important",
        },
        containedPrimary: { boxShadow: "none" },
        text: { padding: "6px 10px" },
        startIcon: {
          marginRight: 0,
          marginLeft: 8,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: { textTransform: "none" },
        },
      ],
    },

    MuiAppBar: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: { alignItems: "flex-end" },
      },
    },

    MuiToolbar: {
      styleOverrides: { root: { paddingLeft: 16, paddingRight: 16 } },
    },

    MuiDrawer: {
      styleOverrides: { paper: { direction: "rtl" } },
    },

    MuiPaper: {
      styleOverrides: { root: { borderRadius: shape.borderRadius } },
    },

    MuiCard: { styleOverrides: { root: { borderRadius: shape.borderRadius } } },

    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          direction: "rtl", // entire TextField is RTL
          "& .MuiInputBase-root": {
            direction: "rtl", // input content RTL
          },
          "& .MuiInputLabel-root": {
            right: 28,
            left: "auto", // position label to right
            transformOrigin: "top right", // floating label animation
          },
          // Fix the notch/legend for outlined variant
          "& .MuiOutlinedInput-notchedOutline": {
            paddingRight: "8px", // adjust if needed
            paddingLeft: "0px",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          textAlign: "right",
          transformOrigin: "top right",
          right: 28,
          left: 0,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          textAlign: "right",
          paddingRight: "8px", // make the legend appear at right
          paddingLeft: "0px",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: { root: { textAlign: "right" } },
    },

    MuiDialog: {
      defaultProps: { fullWidth: true, maxWidth: "sm" },
      styleOverrides: {
        paper: { borderRadius: 12, padding: "8px", textAlign: "right" },
      },
    },

    MuiTooltip: {
      defaultProps: { arrow: true, placement: "top" },
      styleOverrides: {
        tooltip: { fontSize: "0.85rem", textAlign: "right", direction: "rtl" },
      },
    },

    MuiMenu: {
      styleOverrides: { paper: { direction: "rtl", textAlign: "right" } },
    },

    MuiListItemText: { styleOverrides: { root: { textAlign: "right" } } },

    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          "& + &": { marginRight: 8 },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10, paddingLeft: 8, paddingRight: 8 },
        // label: { paddingLeft: 12, paddingRight: 12 },
        deleteIcon: {
          marginRight: 0,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, textAlign: "right" },
        body: { textAlign: "right" },
      },
    },

    MuiPagination: { styleOverrides: { ul: { justifyContent: "flex-end" } } },

    MuiTabs: { styleOverrides: { root: { direction: "rtl" } } },

    MuiTab: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 10, textAlign: "right" },
        action: { padding: "4px 16px 0 0" },
      },
    },

    MuiSnackbarContent: { styleOverrides: { root: { direction: "rtl" } } },

    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: {
          right: "unset !important",
          left: 8,
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell--textLeft": {
            textAlign: "center",
            justifyContent: "center",
          },
        },
      },
    },

    //datepicker
    MuiPickerPopper: {
      styleOverrides: {
        root: ({ theme }) => ({
          zIndex: (theme.zIndex.modal || 1300) + 2000,
        }),
        paper: ({ theme }) => ({
          marginTop: 4,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          background: (theme.vars || theme).palette.background.paper,
          color: (theme.vars || theme).palette.text.primary,
          boxShadow:
            "0 4px 16px 0px hsla(220, 30%, 5%, 0.07), 0 8px 16px -5px hsla(220, 25%, 10%, 0.07)",
          [`& .${menuItemClasses.root}`]: {
            borderRadius: 6,
            margin: "0 6px",
          },
          ...theme.applyStyles("dark", {
            background: (theme.vars || theme).palette.background.paper,
            color: (theme.vars || theme).palette.text.primary,
            boxShadow:
              "0 4px 16px 0px hsla(220, 30%, 5%, 0.7), 0 8px 16px -5px hsla(220, 25%, 10%, 0.8)",
          }),
        }),
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: ({ theme }) => ({
          padding: 0,
          border: "none",
          color: (theme.vars || theme).palette.primary.main,
          fontWeight: theme.typography.fontWeightMedium,
          background: "transparent",
          "&:hover": {
            background: alpha((theme.vars || theme).palette.primary.main, 0.08),
          },
        }),
        label: ({ theme }) => ({
          color: (theme.vars || theme).palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.text.primary,
          background: "transparent",
          borderRadius: theme.shape.borderRadius,
          transition: "background 0.2s",
          "&:hover": {
            backgroundColor: alpha(
              (theme.vars || theme).palette.primary.main,
              0.12
            ),
          },
          [`&.${pickersDayClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
          "&:focus": {
            outline: `2px solid ${alpha(
              (theme.vars || theme).palette.primary.main,
              0.5
            )}`,
            outlineOffset: "2px",
          },
          ...theme.applyStyles("dark", {
            color: (theme.vars || theme).palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(
                (theme.vars || theme).palette.primary.main,
                0.18
              ),
            },
            [`&.${pickersDayClasses.selected}`]: {
              backgroundColor: (theme.vars || theme).palette.primary.main,
              color: (theme.vars || theme).palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
            },
          }),
        }),
      },
    },
    MuiMonthCalendar: {
      styleOverrides: {
        button: ({ theme }) => ({
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.text.primary,
          padding: theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          "&:hover": {
            backgroundColor: alpha(
              (theme.vars || theme).palette.primary.main,
              0.12
            ),
          },
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
          "&:focus": {
            outline: `2px solid ${alpha(
              (theme.vars || theme).palette.primary.main,
              0.5
            )}`,
            outlineOffset: "2px",
          },
          ...theme.applyStyles("dark", {
            color: (theme.vars || theme).palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(
                (theme.vars || theme).palette.primary.main,
                0.18
              ),
            },
            [`&.${yearCalendarClasses.selected}`]: {
              backgroundColor: (theme.vars || theme).palette.primary.main,
              color: (theme.vars || theme).palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
            },
          }),
        }),
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        button: ({ theme }) => ({
          fontSize: theme.typography.body1.fontSize,
          color: (theme.vars || theme).palette.text.primary,
          padding: theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          height: "fit-content",
          "&:hover": {
            backgroundColor: alpha(
              (theme.vars || theme).palette.primary.main,
              0.12
            ),
          },
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
          "&:focus": {
            outline: `2px solid ${alpha(
              (theme.vars || theme).palette.primary.main,
              0.5
            )}`,
            outlineOffset: "2px",
          },
          ...theme.applyStyles("dark", {
            color: (theme.vars || theme).palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(
                (theme.vars || theme).palette.primary.main,
                0.18
              ),
            },
            [`&.${yearCalendarClasses.selected}`]: {
              backgroundColor: (theme.vars || theme).palette.primary.main,
              color: (theme.vars || theme).palette.primary.contrastText,
              fontWeight: theme.typography.fontWeightBold,
            },
          }),
        }),
      },
    },
  };
}
