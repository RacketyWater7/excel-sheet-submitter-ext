import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageRounded } from '@mui/icons-material';

export const ImagePicker = ({
  src,
  selectedImage,
  selectImage,
  setImageError,
  imageAttachment,
}) => {
  const [preview, setPreview] = useState(src || '');

  useEffect(() => {
    let objectUrl;
    if (selectedImage instanceof File) {
      objectUrl = URL.createObjectURL(selectedImage);
      setPreview(objectUrl);
    } else if (selectedImage instanceof HTMLImageElement) {
      setPreview(selectedImage.src);
    } else if (typeof selectedImage === 'string') {
      setPreview(selectedImage);
    }

    // Free memory when the component is unmounted
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [selectedImage, src]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      // check if the file is an image
      if (!acceptedFiles[0].type.includes('image')) {
        setImageError(true);
        return;
      }
      selectImage(acceptedFiles[0]);
      setImageError(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ my: '2rem', display: 'flex', alignItems: 'center' }}>
      {!imageAttachment && (
        <Avatar
          src={preview}
          variant="square"
          sx={{ height: '6rem', width: '6rem', cursor: 'pointer' }}
        />
      )}
      {imageAttachment && (
        <Box
          sx={{
            height: '6rem',
            width: '6rem',
          }}
        >
          {preview && (
            <img
              id="imagePreview"
              src={preview}
              alt="attachment"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          )}
          {!preview && (
            <Box
              sx={{
                height: '100%',
                width: '100%',
              }}
            >
              <ImageRounded
                sx={{ fontSize: '2rem', marginLeft: '40%', marginTop: '40%' }}
              />
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ width: '1.6rem' }} />
      <ImagePickerButton
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
      />
    </Box>
  );
};

const ImagePickerButton = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
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
        accept="image/*"
        id="imageInput"
        style={{ display: 'none' }}
      />

      <ImageRounded sx={{ fontSize: '2rem', color: 'primary.main' }} />
      <Typography style={{ color: 'gray' }}>
        {isDragActive
          ? 'Drop the image here'
          : "Drag 'n' drop an image here or click here to select one"}
      </Typography>
    </Box>
  );
};
