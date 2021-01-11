import React from 'react';
import { getFilename } from '../../selectors/image';
import { isLoaderShown } from '../../selectors/loader';
import { useSelector } from 'react-redux';
import ImageBox from '../ImageBox/ImageBox';
import Toolbox from '../Toolbox/Toolbox';
import Loader from '../Loader/Loader';
import './AppContainer.scss';

const AppContainer = () => {
  const filename = useSelector(getFilename);
  const loaderShown = useSelector(isLoaderShown);

  return (
    <div className="box">
      {filename && <Toolbox />}
      <ImageBox filename={filename} />
      {loaderShown && <Loader withBackdrop />}
    </div>
  );
};

export default AppContainer;
