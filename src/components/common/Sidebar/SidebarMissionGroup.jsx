import React from "react";
import styles from "./SidebarMissionGroup.module.scss";

function SidebarMissionGroup({ missionGroupItems }) {
  return (
    <>
      {missionGroupItems.map((groupItem, index) => (
        <div key={index} className={styles.missionGroup}>
          <ul>
            <li className={styles.missionGroupTitle}>
              <span
                className={[
                  styles.missionGroupTitleLetter,
                  styles[`no_${index % 10}`],
                ].join(" ")}
              >
                {groupItem.missionGroup.name
                  .substring(0, 1)
                  .concat(
                    groupItem.missionGroup.name.length > 1 &&
                      groupItem.missionGroup.name.split(" ")[1]
                      ? groupItem.missionGroup.name
                          .split(" ")[1]
                          .substring(0, 1)
                      : groupItem.missionGroup.name.substring(1, 2)
                  )}
              </span>
              {groupItem.missionGroup.name}
            </li>
            <ul>
              <li className={styles.missionGroupItem}>
                <span>홈</span>
              </li>
              <li className={styles.missionGroupItem}>
                <span>학습계획</span>
              </li>
            </ul>
          </ul>
        </div>
      ))}
    </>
  );
}

export default SidebarMissionGroup;
