import React, { useCallback } from 'react';
import { chooseFile } from '../../actions';
import useAction from '../../hooks/useAction';
import Dropzone from 'react-dropzone';
import Icon from './icon.js.svg';
import './FileLoader.scss';

const FileLoader = () => {
  const onChooseFile = useAction(chooseFile);

  const dropHandler = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const localURL = window.URL.createObjectURL(file);
    onChooseFile(localURL);
  });

  return (
    <Dropzone
      accept={['image/png', 'image/jpeg', 'image/bmp', 'image/gif']}
      multiple={false}
      className="file-loader"
      rejectClassName="file-loader_rejected"
      acceptClassName="file-loader_accepted"
      onDrop={dropHandler}
    >
      <p>
        Перетащите файлы или <b>нажмите</b> для выбора файла
      </p>
      <Icon />
    </Dropzone>
  );
};

export default FileLoader;
