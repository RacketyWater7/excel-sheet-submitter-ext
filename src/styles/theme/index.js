import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { themeOptions } from './options';
import React from 'react';

const createAppTheme = () => {
  const theme = createTheme(themeOptions);

  return responsiveFontSizes(theme);
};

export const AppThemeProvider = ({ children }) => {
  return <ThemeProvider theme={createAppTheme()}>{children}</ThemeProvider>;
};
