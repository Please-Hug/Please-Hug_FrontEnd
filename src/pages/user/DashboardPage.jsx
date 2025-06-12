import React from "react";
import { Link } from "react-router-dom";
import styles from "./DashboardPage.module.scss";
import {
  FaAngleRight,
  FaCaretRight,
  FaCircleInfo,
  FaCodeBranch,
} from "react-icons/fa6";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";

function DashboardPage() {
  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.dashboardGreeting}>
        정휘상(백엔드 3회차)님,
        <br /> 오늘도 좋은 하루 보내세요!
      </h1>
      <ul className={styles.dashboardMenu}>
        <li>
          <Link to="/" className={styles.active}>
            홈
          </Link>
        </li>
        <li>
          <Link to="/activity">활동</Link>
        </li>
        <li>
          <Link to="/settings">설정</Link>
        </li>
      </ul>
      <div className={styles.dashboardContent}>
        <div className={styles.dashboardLeft}>
          <div className={styles.learningHeader}>
            <div>
              <h3>(3회차) Spring 기반 백엔드 개발자 성장 과정</h3>
              <span>출결 QR 코드</span>
            </div>
            <div>
              <label htmlFor="learning-progress">68/107</label>
              <progress id="learning-progress" value="68" max="107" />
            </div>
            <div>
              <Link to="/">학습하기</Link>
            </div>
          </div>
          <div className={styles.learningPlans}>
            <div>
              <div>
                <h3>학습 계획</h3>
                <span>2</span>
              </div>
              <select
                className={styles.selectPlanStatus}
                defaultValue="in-progress"
              >
                <option value="ready">시작전</option>
                <option value="in-progress">진행중</option>
                <option value="paused">중단</option>
                <option value="completed">완료</option>
                <option value="feedback">피드백중</option>
                <option value="feedback-ended">피드백 종료</option>
              </select>
            </div>
            <ul>
              <li>
                <FaCaretRight />
                <span>데이터베이스 및 ORM</span>
                <div>
                  <span>
                    <FaCodeBranch /> <span>9</span>
                  </span>
                </div>
                <div>
                  <span>정휘상(백엔드 3회차)</span>
                </div>
                <span>없음</span>
                <img src={emptyUserProfile} alt="정휘상(백엔드 3회차)" />
              </li>
              <li>
                <FaCaretRight />
                <span>Spring 프레임워크 고급</span>
                <div>
                  <span>
                    <FaCodeBranch /> <span>14</span>
                  </span>
                </div>
                <div>
                  <span>정휘상(백엔드 3회차)</span>
                </div>
                <span>없음</span>
                <div>
                  <img src={emptyUserProfile} alt="정휘상(백엔드 3회차)" />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.recentDiary}>
            <div className={styles.recentDiaryHeader}>
              <div>
                <h3>최근 작성한 배움일기</h3>
                <FaCircleInfo />
              </div>
              <Link to="">
                더보기 <FaAngleRight />
              </Link>
            </div>
            <ul className={styles.recentDiaryList}>
              <li>
                <span>hugEDU</span>
                <h3>(메모) 리눅스 젠킨스 관련 문제 해결</h3>
                <span>10일 전</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.dashboardRight}>
          <div className={styles.userProfile}>
            <div>
              <img src={emptyUserProfile} alt="정휘상(백엔드 3회차)" />
              <div>
                <h2>정휘상(백엔드 3회차)</h2>
                <div>
                  <span>Hugton 알고리즘 미션 강좌</span>
                  <span>
                    랭킹 <span>11%</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <progress id="user-experience-progress" value="4721" max="6274" />
              <div>
                <span>LEVEL 17</span>
                <label htmlFor="user-experience-progress">4721 / 6274</label>
              </div>
            </div>
          </div>
          <div className={styles.attendanceCheck}>
            <div>
              <h3>출석체크</h3>
              <span>연속 출석 2일</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th>토</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td>12</td>
                  <td>13</td>
                  <td>14</td>
                </tr>
              </tbody>
            </table>
            <button>내일 또 만나요</button>
          </div>
          <div>
            <div>
              <h3>데일리 퀘스트</h3>
              <Link to="/daily-quest">
                더보기 <FaAngleRight />
              </Link>
            </div>
            <ul>
              <li>
                <div>
                  <p>주간 리워드</p>
                  <div>
                    <span>200포인트</span>
                    <span> / 500포인트</span>
                    <button>획득 완료</button>
                  </div>
                </div>
              </li>
              <li>
                <img src="about:blank" alt="퀘스트 아이콘" />
                <div>
                  <span>배움일기 댓글 작성</span>
                  <span>0회 / 1회</span>
                </div>
                <button>50 포인트</button>
              </li>
              <li>
                <img src="about:blank" alt="퀘스트 아이콘" />
                <div>
                  <span>미션 리워드 받기</span>
                  <span>0회 / 1회</span>
                </div>
                <button>50 포인트</button>
              </li>
              <li>
                <img src="about:blank" alt="퀘스트 아이콘" />
                <div>
                  <span>태스크 완료</span>
                  <span>0회 / 1회</span>
                </div>
                <button>50 포인트</button>
              </li>
              <li>
                <img src="about:blank" alt="퀘스트 아이콘" />
                <div>
                  <span>일일 퀘스트 완료</span>
                  <span>0회 / 1회</span>
                </div>
                <button>50 포인트</button>
              </li>
              <li>
                <img src="about:blank" alt="퀘스트 아이콘" />
                <div>
                  <span>배움일기 좋아요하기</span>
                  <span>0회 / 1회</span>
                </div>
                <button>50 포인트</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
