import React, { useEffect, useState } from "react";
import { getMyMissionGroups, myChallenges } from "../../api/missionService";
import LearningPlanItem from "./LearningPlanItem";
import styles from "./LearningPlans.module.scss";

function LearningPlans() {
  const [missionGroups, setMissionGroups] = useState([]);
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    const fetchMissionGroups = async () => {
      try {
        const result = await getMyMissionGroups();
        console.log("미션 그룹 데이터:", result.data);
        setMissionGroups(result.data);
      } catch (error) {
        console.error("미션 그룹 정보를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMissionGroups();
  }, []);

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const newChallenges = [];
        for (const group of missionGroups) {
          const result = await myChallenges(group.missionGroup.id);
          console.log(
            `그룹 ${group.missionGroup.id}의 도전 과제 데이터:`,
            result.data
          );
          for (const challenge of result.data) {
            if (
              challenge.progress == "REWARD_RECEIVED" ||
              challenge.progress == "FEEDBACK_COMPLETED" ||
              challenge.progress == "IN_FEEDBACK"
            ) {
              continue;
            }
            console.log("도전 과제:", challenge);
            newChallenges.push(challenge);
          }
        }
        setChallenges(newChallenges);
        console.log("내 도전 과제 목록:", newChallenges);
      } catch (error) {
        console.error("내 도전 과제를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMyChallenges();
  }, [missionGroups]);

  useEffect(() => {
    console.log("현재 도전 과제 목록:", challenges);
  }, [challenges]);

  if (challenges.length === 0) {
    return (
      <div className={styles.learningPlans}>
        <h3>학습 계획</h3>
        <p>현재 진행 중인 학습 계획이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.learningPlans}>
      <div>
        <div>
          <h3>학습 계획</h3>
          <span>{challenges.length}</span>
        </div>
        <select className={styles.selectPlanStatus} defaultValue="IN_PROGRESS">
          <option value="NOT_STARTED">시작전</option>
          <option value="IN_PROGRESS">진행중</option>
          <option value="ABORTED">중단</option>
          <option value="COMPLETED">완료</option>
        </select>
      </div>
      <ul>
        {/* {plans.map((plan, index) => (
          <LearningPlanItem key={index} {...plan} statusLabel="없음" />
        ))} */}
        {challenges.map((challenge, index) => (
          <LearningPlanItem
            key={index}
            title={challenge.mission.name}
            missionId={challenge.mission.id}
            manager={challenge.user}
            statusLabel="없음"
          />
        ))}
      </ul>
    </div>
  );
}

export default LearningPlans;
