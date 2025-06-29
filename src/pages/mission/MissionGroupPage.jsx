import React, { useEffect, useMemo } from "react";
import TabComponent from "../../components/common/TabComponent/TabComponent";
import MissionHome from "../../components/Mission/MissionHome";
import MissionBoard from "../../components/Mission/MissionBoard";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MissionGroupPage.module.scss";
import useBreadcrumbStore from "../../stores/breadcrumbStore";

function MissionGroupPage({ componentType }) {
  const navigate = useNavigate();
  const { missionGroupId } = useParams();
  const tabs = useMemo(
    () => [
      { id: 1, name: "홈", componentType: "home" },
      { id: 2, name: "학습계획", componentType: "learning-plan" },
    ],
    []
  );

  const { setBreadcrumbItems } = useBreadcrumbStore();
  useEffect(() => {
    const tab = tabs.find((tab) => tab.componentType === componentType);
    setBreadcrumbItems([
      { label: "미션", path: "/mission" },
      {
        label: tab.name,
        path: `/mission-group/${missionGroupId}/${tab.componentType}`,
      },
    ]);
  }, [setBreadcrumbItems, missionGroupId, componentType, tabs]);

  return (
    <div className={styles.missionGroupPage}>
      <h2>미션</h2>
      <TabComponent
        tabs={tabs}
        active={{
          id: tabs.find((tab) => tab.componentType === componentType).id,
        }}
        onTabChange={(item) => {
          navigate(`/mission-group/${missionGroupId}/${item.componentType}`, {
            replace: true,
          });
        }}
      />
      {componentType == "home" && <MissionHome groupId={missionGroupId} />}
      {componentType == "learning-plan" && (
        <MissionBoard groupId={missionGroupId} />
      )}
    </div>
  );
}

export default MissionGroupPage;
