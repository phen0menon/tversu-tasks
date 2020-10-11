import { h } from "preact";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TabHeader = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

TabHeader.propTypes = {
  children: PropTypes.node,
};

export default TabHeader;
