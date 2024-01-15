import { createTheme } from "@mui/material";

// COMBINACION 1
// font-family: 'Advent Pro', sans-serif;
// font-family: 'Oxygen', sans-serif;
// font-family: 'Oxygen Mono', monospace;
// COMBINACION 2
// font-family: 'Bebas Neue', sans-serif;
// font-family: 'Montserrat', sans-serif;

export const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Bebas Neue",
    },
    h2: {
      fontFamily: "Bebas Neue",
    },
    h4: {
      fontFamily: "Montserrat",
      //  cardCarouselPromotionn
      // support
      // Questions
    },
    h5: {
      fontFamily: "Montserrat",
      // homeProduct
      //Support
    },
    h6: {
      fontFamily: "Montserrat",
      // navItems
    },
    subtitle2: {
      fontFamily: "Montserrat",
      // ProductCardSubtitle
      // ProductPrice
    },
    body1: {
      fontFamily: "Montserrat",
      //Loadings Flags
    },
    body2: {
      fontFamily: "Montserrat",
      // support
    },
    span: {},
  },
});
