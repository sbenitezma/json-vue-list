import {
  primary,
  accent,
  secondary,
  success,
  info,
  warning,
  error,
  white,
} from "@/assets/scss/variables.scss";

export default {
  dark: {
    primary: {
      base: primary, // Primary
    },
    secondary: {
      base: secondary, // Hover color
    },
    accent: accent, // Active color for buttons, links..
    info: {
      base: info, // Font & icon color
    },
    success: {
      base: success, // Font & icon color
    },
    warning: {
      base: warning, // Font & icon color
    },
    error: {
      base: error, // Font & icon color
    },
    white: {
      base: white,
    },
  },
};
