import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MissionDetailPage.module.scss";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getMissionDetail } from "../../api/missionService";
import MissionTask from "../../components/Mission/MissionTask";
import SideModal from "../../components/common/SideModal/SideModal";
import MissionFeedbackCard from "../../components/Mission/MissionFeedbackCard";
import useBreadcrumbStore from "../../stores/breadcrumbStore";

function MissionDetailPage() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const [missionDetail, setMissionDetail] = useState(null);
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const sideModalWidth = 480;
  const { setBreadcrumbItems } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumbItems([
      { label: "미션", path: "/mission" },
      {
        label: missionDetail?.name || "미션 상세",
        path: `/mission/${missionId}`,
      },
    ]);
  }, [missionId, setBreadcrumbItems, missionDetail]);

  useEffect(() => {
    const fetchMissionDetail = async () => {
      try {
        const data = await getMissionDetail(missionId);
        console.log("미션 상세 정보:", data);
        setMissionDetail(data.data);
      } catch (error) {
        console.error("미션 상세 정보 가져오기 실패:", error);
      }
    };

    fetchMissionDetail();
  }, [missionId]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  if (!missionDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.missionDetailPage}>
      <h2 className={styles.missionDetailPageTitle}>
        <button
          className={styles.missionDetailBackButton}
          onClick={handleBackButtonClick}
        >
          <FaArrowLeft />
        </button>
        {missionDetail.name}
      </h2>
      <div className={styles.missionDetailContent}>
        <div className={styles.missionDetailMainSection}>
          <div className={styles.missionDetailCard}>
            <h4>미션 설명</h4>
            <p className={styles.missionDetailDescription}>
              {missionDetail.description}
            </p>
          </div>
          <div className={styles.missionDetailCard}>
            <h4>태스크</h4>
            <MissionTask
              missionId={missionId}
              style={{ border: "none", padding: 0 }}
            />
          </div>
        </div>
        <div className={styles.missionDetailSidebar}>
          <div className={styles.missionDetailCard}>
            <span className={styles.missionDetailCompleteMessage}>
              다 하셨으면, 아래 버튼을 눌러주세요 <FaCircleInfo />
            </span>
            <button
              className={styles.missionDetailCompleteButton}
              onClick={() => setIsSideModalOpen(true)}
            >
              끝내고 피드백하기
            </button>
          </div>
          <div className={styles.missionDetailCard}>
            <h4>기본 정보</h4>
            <ul className={styles.missionDetailInfoList}>
              <li>
                <span className={styles.missionDetailLabel}>진행 상태</span>
                <span className={styles.missionDetailValue}>진행중</span>
              </li>
              <li>
                <span className={styles.missionDetailLabel}>리더</span>
                <span className={styles.missionDetailValue}>없음</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SideModal
        isOpen={isSideModalOpen}
        onClose={() => setIsSideModalOpen(false)}
        width={sideModalWidth}
      >
        <MissionFeedbackCard missionId={missionId} />
      </SideModal>
    </div>
  );
}

export default MissionDetailPage;
