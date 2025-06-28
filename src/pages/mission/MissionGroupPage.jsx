import React, { useState } from "react";
import TabComponent from "../../components/common/TabComponent/TabComponent";
import MissionHome from "../../components/Mission/MissionHome";
import MissionBoard from "../../components/Mission/MissionBoard";
import { useNavigate, useParams } from "react-router-dom";

function MissionGroupPage({ componentType }) {
  const navigate = useNavigate();
  const { missionGroupId } = useParams();
  const tabs = [
    { id: 1, name: "홈", componentType: "home" },
    { id: 2, name: "학습계획", componentType: "learning-plan" },
  ];
  return (
    <div>
      <h2>미션</h2>
      <TabComponent
        tabs={tabs}
        onTabChange={(item) => {
          navigate(`/mission-group/${missionGroupId}/${item.componentType}`, {
            replace: true,
          });
        }}
      />
      {componentType == "home" && <MissionHome />}
      {componentType == "learning-plan" && <MissionBoard />}
    </div>
  );
}

export default MissionGroupPage;
