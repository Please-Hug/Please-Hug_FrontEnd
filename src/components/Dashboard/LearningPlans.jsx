import LearningPlanItem from "./LearningPlanItem";
import styles from "./LearningPlans.module.scss";

function LearningPlans() {
  const plans = [
    {
      title: "데이터베이스 및 ORM",
      branchCount: 9,
      manager: "ㅇㅇㅇ",
    },
    {
      title: "Spring 프레임워크 고급",
      branchCount: 14,
      manager: "ㅇㅇㅇ",
    },
  ];

  return (
    <div className={styles.learningPlans}>
      <div className={styles.plansHeader}>
        <div>
          <h3>학습 계획</h3>
          <span>{plans.length}</span>
        </div>
        <select className={styles.selectPlanStatus} defaultValue="in-progress">
          <option value="ready">시작전</option>
          <option value="in-progress">진행중</option>
          <option value="paused">중단</option>
          <option value="completed">완료</option>
          <option value="feedback">피드백중</option>
          <option value="feedback-ended">피드백 종료</option>
        </select>
      </div>
      <ul>
        {plans.map((plan, index) => (
          <LearningPlanItem key={index} {...plan} statusLabel="없음" />
        ))}
      </ul>
    </div>
  );
}

export default LearningPlans;
