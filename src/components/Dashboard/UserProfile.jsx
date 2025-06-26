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
      <div>
        <img src={profileImg} alt={username} />
        <div>
          <h2>{username}</h2>
          <div>
            <span>{course}</span>
            <span>
              랭킹 <span>{rank}</span>
            </span>
          </div>
        </div>
      </div>

      <div>
        <progress
          id="user-experience-progress"
          value={currentExp}
          max={maxExp}
        />
        <div>
          <span>LEVEL {level}</span>
          <label htmlFor="user-experience-progress">
            {currentExp} / {maxExp}
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
