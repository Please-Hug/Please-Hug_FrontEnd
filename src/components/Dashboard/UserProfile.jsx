import React from "react";
import styles from "./UserProfile.module.scss";

function UserProfile({
  profileImg,
  username,
  course,
  rank,
  level,
  currentExp,
  maxExp,
}) {
  return (
    <div className={styles.userProfile}>
      <div className={styles.profileTop}>
        <img src={profileImg} alt={username} />
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>{username}</h2>
          <div className={styles.courseContainer}>
            <span className={styles.courseName}>{course}</span>
            <span className={styles.userRank}>
              랭킹 <span>{rank}</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <progress
          id="user-experience-progress"
          value={currentExp}
          max={maxExp}
          className={styles.experienceProgress}
        />
        <div className={styles.levelInfo}>
          <span className={styles.userLevel}>LEVEL {level}</span>
          <label
            htmlFor="user-experience-progress"
            className={styles.experienceLabel}
          >
            {currentExp} / {maxExp}
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
