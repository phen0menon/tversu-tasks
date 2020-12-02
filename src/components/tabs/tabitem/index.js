import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useContext } from "preact/hooks";
import { TabContext } from "../contexts";

import styles from "./styles.css";

const TabItem = ({ id, children }) => {
  const { tab } = useContext(TabContext);
  return (
    <div
      className={classnames(styles.tab, {
        [styles.active]: id === tab,
      })}
    >
      {children}
    </div>
  );
};

TabItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TabItem;
