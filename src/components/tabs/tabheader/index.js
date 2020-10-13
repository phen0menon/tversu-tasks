import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TabHeader = ({ children, className }) => {
  return <div className={classnames(styles.root, className)}>{children}</div>;
};

TabHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TabHeader;
