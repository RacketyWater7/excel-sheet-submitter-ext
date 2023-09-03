import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import '../../assets/styles/tailwind.css';
import { AppThemeProvider } from '../../styles/theme';

render(
  <AppThemeProvider>
    <Popup />
  </AppThemeProvider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
