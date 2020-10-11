import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useCallback, useContext } from "preact/hooks";
import { TabContext } from "../contexts";
import styles from "./styles.css";

const TabHeaderItem = ({ id, children }) => {
  const { tab, setTab } = useContext(TabContext);
  const tabClassName = classnames(styles.tab, {
    [styles.tabActive]: tab === id,
  });

  const onTabClick = useCallback(() => {
    setTab(id);
  }, [setTab, id]);

  return (
    <div className={tabClassName} onClick={onTabClick}>
      {children}
    </div>
  );
};

TabHeaderItem.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default TabHeaderItem;
