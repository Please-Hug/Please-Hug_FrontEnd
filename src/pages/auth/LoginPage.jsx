import React from "react";
import styles from "./LoginPage.module.scss";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <form className={styles.loginForm} action="/login" method="POST">
        <div className={styles.inputGroup}>
          <input
            className={styles.usernameInput}
            type="text"
            id="username"
            name="username"
            placeholder="이메일 또는 아이디"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
          />
          <FaEyeSlash className={styles.inputIcon} />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit">로그인</button>
        </div>
        <div className={styles.footer}>
          <div className={styles.rememberMe}>
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">로그인 상태 유지</label>
          </div>
          <div className={styles.links}>
            <Link to="/auth/forgot-password">비밀번호 재설정</Link>
            <Link to="/auth/register">회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
