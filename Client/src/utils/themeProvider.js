import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Define tu tema personalizado con la tipografía deseada
export const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Roboto, sans-serif',
      // Otras propiedades de estilo para h1 si es necesario
    },
    h2: {
      fontFamily: 'Times New Roman, serif',
      // Otras propiedades de estilo para h2 si es necesario
    },
    // Otras configuraciones de tipografía según sea necesario
  },
});
