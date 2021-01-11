import React, { useRef, useState } from 'react';
import Arrow from './Arrow';
import './ExpandableContainer.scss';

const ExpandableContainer = ({ defaultExpanded, title, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const containerRef = useRef();

  return (
    <section className="expandable-container">
      <div
        className="expandable-container__title"
        onClick={() => setExpanded(!expanded)}
      >
        {title} <Arrow expanded={expanded} />
      </div>
      <div
        className="expandable-container__content"
        style={{
          maxHeight: expanded
            ? containerRef.current && containerRef.current.scrollHeight
            : 0
        }}
        ref={containerRef}
      >
        <div className="expandable-container__content-wrapper">{children}</div>
      </div>
    </section>
  );
};

//  class ExpandableContainer extends React.Component {

export default ExpandableContainer;
