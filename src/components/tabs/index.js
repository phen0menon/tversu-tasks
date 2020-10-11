import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { TabContext } from "./contexts";
import PropTypes from "prop-types";

const Tabs = ({ defaultActiveTabId, children }) => {
  const [tab, setTab] = useState(defaultActiveTabId);

  useEffect(() => {
    if (!defaultActiveTabId) {
      throw new Error(`Tabs: property defaultActiveTabId is not specified`);
    }
  }, [defaultActiveTabId]);

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

Tabs.propTypes = {
  defaultActiveTabId: PropTypes.string,
  children: PropTypes.node,
};

export default Tabs;
