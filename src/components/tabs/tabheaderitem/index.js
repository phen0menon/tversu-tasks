import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useCallback, useContext } from "preact/hooks";
import { TabContext } from "../contexts";
import styles from "./styles.css";

const TabHeaderItem = ({ id, children, render }) => {
  const { tab, setTab } = useContext(TabContext);
  const tabClassName = classnames(styles.tab, {
    [styles.tabActive]: tab === id,
  });

  const onTabClick = useCallback(() => {
    setTab(id);
  }, [setTab, id]);

  // Custom render with onClick callback
  if (render) {
    return render(onTabClick);
  }

  return (
    <div className={tabClassName} onClick={onTabClick}>
      {children}
    </div>
  );
};

TabHeaderItem.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  render: PropTypes.func,
};

export default TabHeaderItem;
