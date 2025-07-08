import React, { useState, useEffect } from "react";
import styles from "./TabComponent.module.scss";
import useTokenPayload from "../../../stores/tokenPayloadStore";

function TabComponent({ tabs, active, onTabChange, onEditClick = () => {} }) {
  const [activeTab, setActiveTab] = useState(active || tabs[0]);
  const tokenPayload = useTokenPayload((state) => state.tokenPayload);

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
          {tokenPayload?.role === "ROLE_ADMIN" && (
            <button
              className={styles.editButton}
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(tab);
              }}
              aria-label={`${tab.name} 편집`}
            >
              Edit
            </button>
          )}
        </li>
      ))}
      <li>&nbsp;</li>
    </ul>
  );
}

export default TabComponent;
