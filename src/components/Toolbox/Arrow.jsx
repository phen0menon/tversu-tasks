import React from 'react';
import './Arrow.scss';

const Arrow = ({ expanded }) => (
  <span className={`arrow ${expanded ? 'active' : ''}`}>
    <span />
    <span />
  </span>
);

export default Arrow;
