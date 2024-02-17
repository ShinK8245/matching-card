import { createTheme } from "@mui/material";
import { lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: lime[400],
      light: lime[200],
    },
  },
});

export default theme;
