import React from 'react';
import './ActionLink.scss';

const ActionLink = ({ title, handleClick }) => (
  <section className="action-link">
    <div className="action-link__title" onClick={handleClick}>
      {title}
    </div>
  </section>
);

export default ActionLink;
