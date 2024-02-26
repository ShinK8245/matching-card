import { createTheme } from "@mui/material";
import { lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: lime[800],
      light: lime[700],
    },
  },
});

export default theme;
