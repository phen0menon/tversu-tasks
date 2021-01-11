import React from 'react';
import FileLoader from '../FileLoader/FileLoader';
import ImageRenderer from '../ImageRenderer/ImageRenderer';
import './ImageBox.scss';

const ImageBox = ({ filename }) => {
  return (
    <div className="image-box">
      {filename ? <ImageRenderer /> : <FileLoader />}
    </div>
  );
};

export default ImageBox;
