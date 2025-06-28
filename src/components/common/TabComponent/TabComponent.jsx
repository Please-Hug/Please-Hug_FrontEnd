import React, { useState, useEffect } from "react";
import styles from "./TabComponent.module.scss";

function TabComponent({ tabs, active, onTabChange }) {
  const [activeTab, setActiveTab] = useState(active || tabs[0]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  useEffect(() => {
    if (active) {
      setActiveTab(active);
    }
  }, [active]);

  return (
    <ul className={styles.tabList}>
      {/* MissionTab */}
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={tab.id === activeTab.id ? styles.active : ""}
          onClick={() => {
            handleTabChange(tab);
          }}
        >
          {tab.name}
        </li>
      ))}
      <li>&nbsp;</li>
    </ul>
  );
}

export default TabComponent;
