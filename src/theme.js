import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      Orange: "#ff5733",
      Green: "#33431f",
      Yellow: "#ffcc00",
      Red: "#ff3333",
      BoxBase: "#1f2a37aa",
    },
  },
   components: {
    Input: {
      // Customize input component
      defaultProps: {
        focusBorderColor: "teal.500", // Set the default focus color for input
      },
    },
    
  },

  styles: {
    global: {
      body: {
        bg: "#1f3343", // Use "bg" for background color
        color: "#ffffff", // Use "color" for text color
      },
    },
  },
});

export default theme;
