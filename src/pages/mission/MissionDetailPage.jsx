import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MissionDetailPage.module.scss";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  getChallenge,
  getReward,
  getMissionFeedback,
} from "../../api/missionService";
import MissionTask from "../../components/Mission/MissionTask";
import SideModal from "../../components/common/SideModal/SideModal";
import MissionFeedbackCard from "../../components/Mission/MissionFeedbackCard";
import useBreadcrumbStore from "../../stores/breadcrumbStore";
import missionStateMap from "../../utils/missionStateMap";

function MissionDetailPage() {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const [missionDetail, setMissionDetail] = useState(null);
  const [myMission, setMyMission] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const sideModalWidth = 480;
  const { setBreadcrumbItems } = useBreadcrumbStore();

  const fetchMyMission = useCallback(async () => {
    try {
      const data = await getChallenge(missionId);
      setMyMission(data.data);
      setMissionDetail(data.data.mission);
    } catch (error) {
      console.error("내 미션 정보 가져오기 실패:", error);
    }
  }, [missionId]);

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
    const fetchFeedback = async () => {
      try {
        if (!myMission) return;
        if (
          myMission.progress !== "FEEDBACK_COMPLETED" &&
          myMission.progress !== "REWARD_RECEIVED"
        )
          return; // 피드백이 완료되지 않은 경우

        const data = await getMissionFeedback(myMission?.id);
        console.log("피드백 데이터:", data);
        setFeedback(data.data);
      } catch (error) {
        console.error("미션 피드백 가져오기 실패:", error);
      }
    };
    fetchFeedback();
  }, [myMission]);

  useEffect(() => {
    fetchMyMission();
  }, [fetchMyMission]);

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
          {feedback && (
            <div className={styles.missionDetailCard}>
              <h4>강사 피드백</h4>
              <p className={styles.missionDetailDescription}>
                {feedback.feedback || "아직 피드백이 없습니다."}
              </p>
            </div>
          )}
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
            {myMission?.progress === "IN_FEEDBACK" ? (
              <button className={styles.missionDetailCompleteButton} disabled>
                피드백 중
              </button>
            ) : myMission?.progress === "FEEDBACK_COMPLETED" ? (
              <button
                className={styles.missionDetailCompleteButton}
                onClick={async () => {
                  await getReward(myMission.id);
                  await fetchMyMission();
                }}
              >
                리워드 받기
              </button>
            ) : myMission?.progress === "REWARD_RECEIVED" ? (
              <button className={styles.missionDetailCompleteButton} disabled>
                리워드 수령 완료
              </button>
            ) : (
              <button
                className={styles.missionDetailCompleteButton}
                onClick={() => setIsSideModalOpen(true)}
              >
                끝내고 피드백하기
              </button>
            )}
          </div>
          <div className={styles.missionDetailCard}>
            <h4>기본 정보</h4>
            <ul className={styles.missionDetailInfoList}>
              <li>
                <span className={styles.missionDetailLabel}>진행 상태</span>
                <span className={styles.missionDetailValue}>
                  {missionStateMap[myMission.progress]}
                </span>
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
        <MissionFeedbackCard
          myMission={myMission}
          onFeedbackSubmitted={async () => {
            setIsSideModalOpen(false);
            await fetchMyMission();
          }}
        />
      </SideModal>
    </div>
  );
}

export default MissionDetailPage;
