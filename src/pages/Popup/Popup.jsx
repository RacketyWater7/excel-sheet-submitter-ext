import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { SheetPicker } from '../../components/common/SheetPicker';
import Browser from 'webextension-polyfill';

const Popup = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      console.log('got data:', data);
      // Send the data to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(
          tabId,
          { type: 'submitData', data },
          (response) => {
            console.log('Submission response from content script:', response);
          }
        );
      });
    }
  }, [data]);

  return (
    <Box
      sx={{
        p: '1rem',
      }}
    >
      <SheetPicker setData={setData} />

      <Box
        sx={{
          mt: '1rem',
          ml: '30%',
        }}
      >
        {/* a button to open the new tab in same window with this url https://apps.acgme.org/ads/CaseLogs/CaseEntry/Insert */}
        <Typography variant="h6">
          Please click the button below to open the Case Entry Page before
          uploading the file.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Browser.tabs.create({
              url: 'https://apps.acgme.org/ads/CaseLogs/CaseEntry/Insert',
            });
          }}
        >
          Open Case Entry Page
        </Button>
      </Box>
    </Box>
  );
};

export default Popup;

// "matches": ["https://apps.acgme.org/ads/CaseLogs/*"],
