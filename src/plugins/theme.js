import {
  primaryBase,
  primaryDarken1,
  primaryDarken2,
  secondaryBase,
  accent,
  infoBase,
  infoLighten1,
  successBase,
  successLighten1,
  warningBase,
  warningLighten1,
  errorBase,
  errorLighten1,
  tertiaryBase,
  tertiaryLighten1,
  tertiaryLighten2,
  tertiaryLighten3,
  tertiaryLighten4,
  tertiaryLighten5,
  tertiaryLighten6,
} from "@/assets/scss/variables.scss";

export default {
  dark: {
    primary: {
      base: primaryBase, // Primary
      darken1: primaryDarken1, // Menu
      darken2: primaryDarken2, // Menu active. Color for active states in menu: in the future it'll be primary color with 20% black applied
    },
    secondary: {
      base: secondaryBase, // Hover color
    },
    accent: accent, // Active color for buttons, links..
    info: {
      base: infoBase, // Font & icon color
      lighten1: infoLighten1, // Background color
    },
    success: {
      base: successBase, // Font & icon color
      lighten1: successLighten1, // Background color
    },
    warning: {
      base: warningBase, // Font & icon color
      lighten1: warningLighten1, // Background color
    },
    error: {
      base: errorBase, // Font & icon color
      lighten1: errorLighten1, // Background color
    },
    tertiary: {
      base: tertiaryBase, // Black. Main color for fonts and selected icons
      lighten1: tertiaryLighten1, // Extradark grey. For font style caption
      lighten2: tertiaryLighten2, // Grey. Used in some icons and UI elements
      lighten3: tertiaryLighten3, // Used in bigger visual elements
      lighten4: tertiaryLighten4, // Line & Border, Outline. Used for lines & borders, e.g. cards border. Also used in Disabled btn (outlined border & background).
      lighten5: tertiaryLighten5, // Border for cards with shadow
      lighten6: tertiaryLighten6, // Background for filled cards
    },
  },
};
