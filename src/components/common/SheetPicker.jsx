import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InsertDriveFileRounded } from '@mui/icons-material';
import * as XLSX from 'xlsx'; // Import the XLSX library for Excel file handling
import Papa from 'papaparse'; // Import the papaparse library for CSV parsing

export const SheetPicker = ({ setData }) => {
  const [preview, setPreview] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (fileType === 'excel' && fileData) {
      // Process Excel data and extract relevant information
      extractExcelData(fileData, setData);
    } else if (fileType === 'csv' && fileData) {
      // Process CSV data and extract relevant information
      extractCSVData(fileData, setData);
    }
  }, [fileType, fileData, setData]);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel'
      ) {
        setFileType('excel');
      } else if (file.type === 'text/csv') {
        setFileType('csv');
      } else {
        // Unsupported file type
        setFileType('');
      }
      setPreview(file.name);
      setFileData(file);
    }
  };

  const extractExcelData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setData(json);
    };
    reader.readAsBinaryString(file);
  };
  const extractCSVData = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        console.log('Parsed CSV data:', result.data);
        setData(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };
  // const extractCSVData = (file) => {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = e.target.result;
  //     const lines = data.split('\n');
  //     const headers = lines[0].split(',');
  //     const rows = lines.slice(1).map((line) => {
  //       const values = line.split(',');
  //       return headers.reduce((obj, header, i) => {
  //         obj[header] = values[i];
  //         return obj;
  //       }, {});
  //     });
  //     setData(rows);
  //   };
  //   reader.readAsText(file);
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ my: '2rem', display: 'flex', alignItems: 'center' }}>
      <Box
        {...getRootProps()}
        sx={{
          flex: 1,
          display: 'grid',
          placeItems: 'center',
          border: '2px dashed rgba(0, 0, 0, 0.12)',
          borderRadius: '0.6rem',
          padding: '1rem',
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main' },
        }}
      >
        <input
          {...getInputProps()}
          accept=".xlsx, .csv"
          id="sheetInput"
          style={{ display: 'none' }}
        />

        <InsertDriveFileRounded
          sx={{ fontSize: '2rem', color: 'primary.main' }}
        />
        <Typography style={{ color: 'gray' }}>
          {isDragActive
            ? 'Drop a spreadsheet or CSV file here'
            : 'Click here to select a spreadsheet or CSV file'}
        </Typography>
      </Box>
      <Box sx={{ width: '1.6rem' }} />
      {preview && <Typography>{`Selected file: ${preview}`}</Typography>}
    </Box>
  );
};
