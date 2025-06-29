import React from "react";
import { useParams } from "react-router-dom";
import styles from "./MissionDetailPage.module.scss";

function MissionDetailPage() {
  const { missionId } = useParams();
  return (
    <div className={styles.missionDetailPage}>
      MissionDetailPage: {missionId}
    </div>
  );
}

export default MissionDetailPage;
