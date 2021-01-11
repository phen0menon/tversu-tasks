import React from 'react';
import Icon from './loader.js.svg';
import './Loader.scss';

const Loader = ({ withBackdrop }) => (
  <div>
    {withBackdrop && <div className="loader-backdrop" />}
    <div className="loader">
      <Icon />
    </div>
  </div>
);

export default Loader;
