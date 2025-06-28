import React, { useState } from "react";
import styles from "./TabComponent.module.scss";

function TabComponent({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

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
